import { useState } from 'react';

import { useToast } from '@/components/ui/use-toast';

import { applyEffect, applyTool } from '@/lib/audioProcessor';

import { bufferToWave, bufferToMp3 } from '@/lib/wavEncoder';


 

export const useAudioProcessor = () => {

  const [processedAudio, setProcessedAudio] = useState(null);

  const [isProcessing, setIsProcessing] = useState(false);

  const [processingProgress, setProcessingProgress] = useState(0);

  const [activeTool, setActiveTool] = useState(null);




 

  const processAudio = async (file, tool, options) => {

    setIsProcessing(true);

    setActiveTool(tool);

    setProcessingProgress(0);


 

    try {

      const audioContext = new (window.AudioContext || window.webkitAudioContext)();

      const arrayBuffer = await file.arrayBuffer();

      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      setProcessingProgress(25);


 

      const onProgress = (progress) => {

        setProcessingProgress(25 + progress * 70);

      };


 

      let result;

      if (tool.type === 'effect' || tool.type === 'preset') {

        result = await applyEffect(audioBuffer, tool, options, onProgress);

      } else if (tool.type === 'tool') {

        result = await applyTool(audioBuffer, tool, options, onProgress);

      }

      

      setProcessingProgress(95);


 

      if (result.type === 'audio') {

        let blob, extension;

        if (tool.name === 'Converter' && options.format === 'mp3') {

           blob = await bufferToMp3(result.buffer);

           extension = 'mp3';

        } else {

           blob = bufferToWave(result.buffer, result.buffer.length);

           extension = 'wav';

        }


 

        const url = URL.createObjectURL(blob);

        setProcessingProgress(100);

        

        setTimeout(() => {

          setProcessedAudio({

            type: 'audio',

            url,

            name: `${tool.name.toLowerCase().replace(/ /g, '_')}_${file.name.split('.')[0]}.${extension}`,

          });

          // toast({

          //   title: "✨ Processing Complete!",

          //   description: `Your audio has been processed with "${tool.name}".`,

          // });

        }, 500);


 

      } else if (result.type === 'image') {

          setProcessingProgress(100);

          setTimeout(() => {

            setProcessedAudio({

                type: 'image',

                url: result.url,

                name: `${tool.name.toLowerCase().replace(/ /g, '_')}_${file.name.split('.')[0]}.png`,

            });

            // toast({

            //     title: '✨ Image Generated!',

            //     description: `Your ${tool.name} is ready.`,

            // });

          }, 500);

      } else if (result.type === 'info') {

          setIsProcessing(false);

          // toast({

          //     title: `💡 ${tool.name} Result`,

          //     description: result.message,

          //     duration: 9000,

          // });

          resetProcessor();

      }


 

    } catch (error) {

      console.error("Audio processing error:", error);

      // toast({

      //   title: "🔥 Whoops! Something went wrong.",

      //   description: `There was an error processing your audio file: ${error.message}`,

      //   variant: "destructive",

      // });

      resetProcessor();

    }

  };


 

  const resetProcessor = () => {

    if (processedAudio && processedAudio.url) {

      URL.revokeObjectURL(processedAudio.url);

    }

    setProcessedAudio(null);

    setIsProcessing(false);

    setActiveTool(null);

    setProcessingProgress(0);

  };


 

  return {

    processedAudio,

    isProcessing,

    processingProgress,

    activeTool,

    processAudio,

    resetProcessor,

  };

};
 