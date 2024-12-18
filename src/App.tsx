import { DocumentArrowDownIcon, DocumentArrowUpIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Confetti } from './components/Confetti';
import { ContactPreview } from './components/ContactPreview';
import { DownloadButton } from './components/DownloadButton';
import { ErrorMessage } from './components/ErrorMessage';
import { FileDropzone } from './components/FileDropzone';
import { Contact } from './types/Contact';
import { downloadFile } from './utils/fileUtils';
import { generateVCF, parseVCF } from './utils/vcfUtils';
import { updateBeninPhoneNumber, isBeninNumber } from './utils/phoneUtils';
import Modal from './components/Modal';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/users/aploon')
      .then(response => response.json())
      .then(data => setAvatarUrl(data.avatar_url))
      .catch(error => console.error('Error fetching GitHub avatar:', error));
  }, []);

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

  const handleContactPicker = async () => {
    try {
      const supported = 'contacts' in navigator && 'ContactsManager' in window;
      if (!supported) {
        setError('L\'API Contact Picker n\'est pas supportée.');
        return;
      }

      const props = ['name', 'tel'];
      const opts = { multiple: true };

      const selectContacts = await (navigator as any).contacts.select(props, opts);
      const newContacts = selectContacts.map((contact: any, index: number) => ({
        id: `contact-picker-${index}`,
        fullName: contact.name[0],
        phoneNumbers: contact.tel.map((tel: string) => ({
          original: tel,
          updated: isBeninNumber(tel) ? updateBeninPhoneNumber(tel) : tel,
          type: 'default'
        }))
      }));

      newContacts.forEach((contact: any) => {
        contact.modified = contact.phoneNumbers.some((p: any) => p.original !== p.updated);
      });

      setContacts([...contacts, ...newContacts]);
      setActiveTab('preview');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    } catch (err) {
      setError('Erreur lors de la sélection des contacts.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Confetti active={showConfetti} />

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <PhoneIcon className="h-8 w-8 text-blue-600" />
            <h1 className="text-lg font-semibold text-gray-900">
              Mise à jour des contacts au Bénin
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
              className={`flex-1 py-4 text-sm font-medium ${activeTab === 'upload'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500'
                }`}
            >
              <DocumentArrowUpIcon className="h-5 w-5 mx-auto mb-1" />
              Importer
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 py-4 text-sm font-medium ${activeTab === 'preview'
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
                <div className='!mt-1 text-center'>
                  <a href="#" onClick={() => setShowModal(true)} className='hover:text-blue-800 hover:underline'>
                    Comment faire la mise à jour ?
                  </a>
                </div>
                <button
                  onClick={handleContactPicker}
                  className="btn btn-primary w-full !mt-2"
                >
                  Sélectionner des contacts
                </button>
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
        <div className='flex gap-2 justify-end mb-1'>
          {avatarUrl && <img src={avatarUrl} alt="GitHub Avatar" className="w-6 h-6 rounded-full" />}
          <span>by <a href="https://github.com/aploon">aploon</a></span>
        </div>
        <a href="https://github.com/aploon/benin-contact-updater">
          <img src="https://img.shields.io/badge/Github%20Repo-Contact-blue" alt="" />
        </a>
      </div>

      <AnimatePresence>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <h2 className="text-xl font-semibold mb-4">Comment faire la mise à jour ?</h2>
            <p>1. Exportez vos contacts en <a href="https://fr.wikipedia.org/wiki/VCard" className='hover:text-blue-800 underline'>VCF</a> depuis votre téléphone.</p>
            <p>2. Importez le fichier VCF dans cette application.</p>
            <p>3. Téléchargez le fichier VCF mis à jour.</p>
            <p>4. Supprimez les anciens contacts de votre téléphone si nécessaire.</p>
            <p>5. Importez le fichier VCF mis à jour dans votre téléphone.</p>
          </Modal>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;