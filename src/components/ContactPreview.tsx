import React from 'react';
import { Contact } from '../types/Contact';
import { CheckCircleIcon, XCircleIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface ContactPreviewProps {
  contacts: Contact[];
  handleDownload: () => void;
}

export const ContactPreview: React.FC<ContactPreviewProps> = ({ contacts, handleDownload }) => {
  const modifiedContacts = contacts.filter(contact => contact.modified);

  return (
    <div className="space-y-4">
      <div className="flex align-items-center justify-center gap-2 text-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {modifiedContacts.length} contacts modifiés
        </span>
        <button className='hover:text-blue-800' onClick={handleDownload}>
          <ArrowDownTrayIcon className="h-5 w-5 mx-auto mb-1" />
        </button>
      </div>
      
      <div className="space-y-3">
        {modifiedContacts.map((contact, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={contact.id}
            className="bg-gray-50 p-4 rounded-lg"
          >
            <h3 className="font-medium text-gray-900 text-sm mb-2">{contact.fullName}</h3>
            <div className="space-y-2">
              {contact.phoneNumbers.map((phone, idx) => (
                <div key={idx} className="flex items-center text-xs">
                  <span className="text-gray-500 w-16">{phone.type}:</span>
                  <div className="flex items-center space-x-2 flex-1">
                    <span className="line-through text-red-500 font-mono">{phone.original}</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-blue-600 font-mono font-medium">{phone.updated}</span>
                    {phone.original !== phone.updated ? (
                      <CheckCircleIcon className="h-4 w-4 text-green-500 ml-auto" />
                    ) : (
                      <XCircleIcon className="h-4 w-4 text-gray-400 ml-auto" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}