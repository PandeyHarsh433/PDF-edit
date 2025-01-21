import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File } from 'lucide-react';
import { motion } from 'framer-motion';

interface FileUploaderProps {
  onFileSelect: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxFiles?: number;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect, accept = { 'application/pdf': ['.pdf'] }, maxFiles = 1 }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxFiles,
    onDrop: (acceptedFiles) => {
      onFileSelect(acceptedFiles);
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-500'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          {isDragActive ? (
            <Upload className="h-12 w-12 text-red-500" />
          ) : (
            <File className="h-12 w-12 text-gray-400" />
          )}
          <div className="text-lg">
            {isDragActive ? (
              <p className="text-red-500">Drop your files here</p>
            ) : (
              <p className="text-gray-600">
                Drag and drop your files here, or <span className="text-red-500">browse</span>
              </p>
            )}
          </div>
          <p className="text-sm text-gray-500">
            Maximum file size: 100MB
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default FileUploader;