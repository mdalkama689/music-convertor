import React, { useState, useRef } from 'react';

import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';

import { Upload, FileAudio, X } from 'lucide-react';


 

const FileUploader = ({ uploadedFile, onFileUpload, onReset }) => {

  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef(null);


 

  const handleDrop = (e) => {

    e.preventDefault();

    setIsDragOver(false);

    const file = e.dataTransfer.files[0];

    onFileUpload(file);

  };


 

  const handleDragOver = (e) => {

    e.preventDefault();

    setIsDragOver(true);

  };


 

  const handleDragLeave = (e) => {

    e.preventDefault();

    setIsDragOver(false);

  };


 

  const handleFileSelect = (e) => {

    const file = e.target.files[0];

    onFileUpload(file);

    e.target.value = null;

  };


 

  const handleButtonClick = () => {

    fileInputRef.current?.click();

  };


 

  return (

    <motion.div

      initial={{ opacity: 0, scale: 0.9 }}

      animate={{ opacity: 1, scale: 1 }}

      transition={{ duration: 0.6, delay: 0.3 }}

      className="max-w-4xl mx-auto px-4 mb-16"

    >

      <div

        className={`upload-zone rounded-2xl p-12 text-center ${isDragOver ? 'drag-over' : ''}`}

        onDrop={handleDrop}

        onDragOver={handleDragOver}

        onDragLeave={handleDragLeave}

      >

        {uploadedFile ? (

          <div className="space-y-4">

            <div className="flex items-center justify-center space-x-4">

              <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">

                <FileAudio className="w-8 h-8 text-white" />

              </div>

              <div className="text-left">

                <h3 className="text-xl font-semibold text-green-400">{uploadedFile.name}</h3>

                <p className="text-gray-400">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>

              </div>

              <Button

                variant="ghost"

                size="icon"

                onClick={onReset}

                className="text-gray-400 hover:text-white"

              >

                <X className="w-5 h-5" />

              </Button>

            </div>

          </div>

        ) : (

          <div className="space-y-6">

            <div className="audio-wave w-20 h-20 rounded-full mx-auto flex items-center justify-center">

              <Upload className="w-10 h-10 text-white" />

            </div>

            <div>

              <h3 className="text-2xl font-semibold mb-2">Drop your audio file here</h3>

              <p className="text-gray-400 mb-6">or click to browse your files</p>

              <input

                type="file"

                accept="audio/*"

                onChange={handleFileSelect}

                className="hidden"

                id="file-upload"

                ref={fileInputRef}

              />

              <Button onClick={handleButtonClick} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 cursor-pointer">

                <Upload className="w-4 h-4 mr-2" />

                Choose File

              </Button>

            </div>

            <p className="text-sm text-gray-500">

              Supports MP3, WAV, OGG, FLAC, and more

            </p>

          </div>

        )}

      </div>

    </motion.div>

  );

};


 

export default FileUploader;
