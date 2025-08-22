import React, { useRef, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';

import { Button } from './ui/button';

import { Progress } from './ui/progress';

import { Download, Loader2 } from 'lucide-react';


 

const ProcessingModal = ({ isOpen, onClose, activeTool, processedAudio, processingProgress }) => {

  const audioRef = useRef(null);


 

  useEffect(() => {

    if (processedAudio?.type === 'audio' && audioRef.current) {

      audioRef.current.src = processedAudio.url;

    }

  }, [processedAudio]);


 

  const handleOpenChange = (open) => {

    if (!open) {

      onClose();

    }

  };


 

  const renderContent = () => {

    if (!processedAudio) {

      return (

        <motion.div

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          exit={{ opacity: 0 }}

          className="flex flex-col items-center space-y-4"

        >

          <Loader2 className="h-16 w-16 animate-spin text-purple-400" />

          <p>Processing: {Math.round(processingProgress)}%</p>

          <Progress value={processingProgress} className="w-[60%]" />

        </motion.div>

      );

    }


 

    if (processedAudio.type === 'audio') {

      return (

        <motion.div

          initial={{ opacity: 0, scale: 0.8 }}

          animate={{ opacity: 1, scale: 1 }}

          exit={{ opacity: 0, scale: 0.8 }}

          className="flex flex-col items-center space-y-6"

        >

          <audio ref={audioRef} controls className="w-full"></audio>

          <Button asChild className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">

            <a href={processedAudio.url} download={processedAudio.name}>

              <Download className="mr-2 h-4 w-4" /> Download Processed File

            </a>

          </Button>

        </motion.div>

      );

    }

    

    if (processedAudio.type === 'image') {

        return (

             <motion.div

                initial={{ opacity: 0, scale: 0.8 }}

                animate={{ opacity: 1, scale: 1 }}

                exit={{ opacity: 0, scale: 0.8 }}

                className="flex flex-col items-center space-y-6"

            >

                <img-replace class="rounded-lg shadow-lg" alt={activeTool?.name}/>

                <Button asChild className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">

                    <a href={processedAudio.url} download={processedAudio.name}>

                        <Download className="mr-2 h-4 w-4" /> Download Image

                    </a>

                </Button>

            </motion.div>

        );

    }

  }


 

  return (

    <Dialog open={isOpen} onOpenChange={handleOpenChange}>

      <DialogContent className="sm:max-w-[425px] glass-effect border-purple-500 text-white">

        <DialogHeader>

          <DialogTitle className="section-header text-2xl">{activeTool?.name || 'Processing'}</DialogTitle>

          <DialogDescription>

            {processedAudio ? 'Your file is ready!' : 'Please wait while we apply the magic...'}

          </DialogDescription>

        </DialogHeader>

        <div className="py-8">

          <AnimatePresence>

            {renderContent()}

          </AnimatePresence>

        </div>

        <DialogFooter>

          <Button variant="outline" onClick={onClose}>Close</Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>

  );

};


 

export default ProcessingModal;
 