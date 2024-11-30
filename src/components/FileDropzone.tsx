import React from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { motion } from 'framer-motion';

interface FileDropzoneProps {
  onFileAccepted: (file: File) => void;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({ onFileAccepted }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/x-vcard': ['.vcf'],
    },
    maxFiles: 1,
    onDropAccepted: files => onFileAccepted(files[0])
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...getRootProps()}
      className={classNames(
        'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300',
        {
          'border-blue-400 bg-blue-50': isDragActive,
          'border-gray-200 hover:border-blue-400': !isDragActive
        }
      )}
    >
      <input {...getInputProps()} />
      <motion.div
        animate={{ scale: isDragActive ? 1.1 : 1 }}
        transition={{ duration: 0.2 }}
        className="space-y-4"
      >
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
          <CloudArrowUpIcon className="h-8 w-8 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900 mb-1">
            {isDragActive ? "Déposez ici" : "Sélectionnez un fichier"}
          </p>
          <p className="text-xs text-gray-500">
            Format accepté: .vcf
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}