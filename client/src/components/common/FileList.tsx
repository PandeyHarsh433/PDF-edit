import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface FileListProps {
  files: File[];
  onRemove: (index: number) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onRemove }) => {
  return (
    <ul className="space-y-2">
      <AnimatePresence>
        {files.map((file, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded"
          >
            <span className="truncate">{file.name}</span>
            <button
              onClick={() => onRemove(index)}
              className="text-red-500 hover:text-red-700 p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default FileList;