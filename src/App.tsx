import { DocumentArrowDownIcon, DocumentArrowUpIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Confetti } from './components/Confetti';
import { ContactPreview } from './components/ContactPreview';
import { DownloadButton } from './components/DownloadButton';
import { ErrorMessage } from './components/ErrorMessage';
import { FileDropzone } from './components/FileDropzone';
import { Contact } from './types/Contact';
import { downloadFile } from './utils/fileUtils';
import { generateVCF, parseVCF } from './utils/vcfUtils';

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');

  const handleFileAccepted = async (file: File) => {
    try {
      setError('');
      const parsedContacts = await parseVCF(file);
      setContacts(parsedContacts);
      if (parsedContacts.some(contact => contact.modified)) {
        setActiveTab('preview');
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    } catch (err) {
      setError('Erreur lors de la lecture du fichier. Vérifiez que le format est correct.');
      console.error(err);
    }
  };

  const handleDownload = () => {
    const vcfContent = generateVCF(contacts);
    downloadFile(vcfContent, 'contacts-updated.vcf', 'text/x-vcard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Confetti active={showConfetti} />
      
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <PhoneIcon className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">
              Mise à jour contacts Bénin
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Navigation Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-4 text-sm font-medium ${
                activeTab === 'upload'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500'
              }`}
            >
              <DocumentArrowUpIcon className="h-5 w-5 mx-auto mb-1" />
              Importer
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 py-4 text-sm font-medium ${
                activeTab === 'preview'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500'
              }`}
            >
              <DocumentArrowDownIcon className="h-5 w-5 mx-auto mb-1" />
              Aperçu
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {activeTab === 'upload' && (
              <div className="space-y-4">
                <FileDropzone onFileAccepted={handleFileAccepted} />
                <ErrorMessage message={error} />
              </div>
            )}

            {activeTab === 'preview' && contacts.length > 0 && (
              <>
                <ContactPreview contacts={contacts} handleDownload={handleDownload} />
                <DownloadButton onClick={handleDownload} />
              </>
            )}
          </div>
        </div>
      </main>

      <div className='fixed bottom-2 right-2 text-end hover:underline'>
        By <a href="https://github.com/aploon">Aploon</a>
          <a href="https://github.com/aploon/benin-contact-updater">
            <img src="https://img.shields.io/badge/Github%20Repo-Contact-blue" alt="" />
          </a>
      </div>

    </div>
  );
}

export default App;