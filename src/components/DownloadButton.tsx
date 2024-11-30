import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface DownloadButtonProps {
  onClick: () => void;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ onClick }) => {
  return (
    <div className="mt-6">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium
                 flex items-center justify-center space-x-2
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <ArrowDownTrayIcon className="h-5 w-5" />
        <span>Télécharger les contacts</span>
      </motion.button>
    </div>
  );
}