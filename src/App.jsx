import  { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet';


import { useAudioProcessor } from './hooks/useAudioProcessor';

import Header from './components/Header';

import FileUploader from './components/FileUploader' 

import ToolTabs from './components/ToolTabs';

import ProcessingModal from './components/ProcessingModal';

import ToolOptionsModal from './components/ToolOptionsModal';
import { toast } from 'sonner';
import MobileShare from './components/share/MobileShare';
import TabShare from './components/share/TabShare';



 

function App() {

  const [uploadedFile, setUploadedFile] = useState(null);

  const [toolWithOptions, setToolWithOptions] = useState(null);


  const {

    processedAudio,

    isProcessing,

    processingProgress,

    activeTool,

    processAudio,

    resetProcessor,

  } = useAudioProcessor();


 

  const handleFileUpload = (file) => {

    if (file && file.type.startsWith('audio/')) {

      setUploadedFile(file);

      resetProcessor();

      toast.success("🎵 Audio file uploaded successfully!", {
       desciption:  `${file.name} is ready for processing.`,
      })

    } else {

       toast.error("❌ Invalid file type", {
       desciption:  "Please upload an audio file (MP3, WAV, OGG, etc.)",
       
      })


    }

  };


 

  const resetState = () => {

    setUploadedFile(null);

    resetProcessor();

  };


 

  const handleToolClick = (tool) => {

    if (!uploadedFile) {

         toast.info("🤔 No audio file!", {
       desciption:  "Please upload an audio file first to use a tool.",

      })
      return;

    }

    

    if (tool.options) {

      setToolWithOptions(tool);

    } else {

      processAudio(uploadedFile, tool);

    }

  };

  

  const handleProcessWithOptions = (options) => {

    if (uploadedFile && toolWithOptions) {

      processAudio(uploadedFile, toolWithOptions, options);

    }

    setToolWithOptions(null);

  }

   const [deviceType, setDeviceType] = useState("big");

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(window.innerWidth < 1024 ? "small" : "big");
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
 

 

  return (

    <div className="min-h-screen relative overflow-hidden">

      <Helmet>

        <title>Online Audio Toolkit - Professional Audio Editing Tools</title>

        <meta name="description" content="Professional online audio toolkit for editing, converting, and applying effects to your audio files. Features bass booster, equalizer, reverb, and more." />

        <meta property="og:title" content="Online Audio Toolkit - Professional Audio Editing Tools" />

        <meta property="og:description" content="Professional online audio toolkit for editing, converting, and applying effects to your audio files. Features bass booster, equalizer, reverb, and more." />

      </Helmet>


 

      <div className="floating-orb"></div>

      <div className="floating-orb"></div>

      <div className="floating-orb"></div>


 

      <div className="relative z-10">

        <Header />

        <FileUploader

          uploadedFile={uploadedFile}

          onFileUpload={handleFileUpload}

          onReset={resetState}

        />

        <div className="max-w-7xl mx-auto px-4 pb-16">

          <ToolTabs onToolClick={handleToolClick} />

        </div>

      </div>


 

      <ProcessingModal

        isOpen={isProcessing}

        onClose={resetProcessor}

        activeTool={activeTool}

        processedAudio={processedAudio}

        processingProgress={processingProgress}

      />

      

      <ToolOptionsModal 

        tool={toolWithOptions}

        isOpen={!!toolWithOptions}

        onClose={() => setToolWithOptions(null)}

        onProcess={handleProcessWithOptions}

      />


 {deviceType === "small" ? <MobileShare /> : <TabShare />} 


    </div>

  );

}


 

export default App; 