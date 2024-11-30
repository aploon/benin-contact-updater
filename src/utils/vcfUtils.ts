import { Contact } from '../types/Contact';
import { updateBeninPhoneNumber, isBeninNumber } from './phoneUtils';

export const parseVCF = async (file: File): Promise<Contact[]> => {
  const text = await file.text();
  const vcards = text.split('BEGIN:VCARD');
  
  return vcards
    .filter(card => card.trim())
    .map((card, index) => {
      const lines = card.split('\n');
      const fullName = lines.find(line => line.startsWith('FN:'))?.slice(3) || 'Unknown';
      const telLines = lines.filter(line => line.startsWith('TEL'));
      
      const phoneNumbers = telLines.map(line => {
        const type = line.includes('TYPE=') 
          ? line.match(/TYPE=([^:]+)/)?.[1] || 'default'
          : 'default';
        const number = line.split(':')[1]?.trim() || '';
        
        return {
          original: number,
          updated: isBeninNumber(number) ? updateBeninPhoneNumber(number) : number,
          type
        };
      });

      const modified = phoneNumbers.some(p => p.original !== p.updated);

      return {
        id: `contact-${index}`,
        fullName,
        phoneNumbers,
        modified
      };
    });
};

export const generateVCF = (contacts: Contact[]): string => {
  return contacts.map(contact => {
    const vcardLines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${contact.fullName}`,
      ...contact.phoneNumbers.map(phone => 
        `TEL;TYPE=${phone.type}:${phone.updated}`
      ),
      'END:VCARD'
    ];
    return vcardLines.join('\n');
  }).join('\n\n');
};