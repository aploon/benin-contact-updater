export const updateBeninPhoneNumber = (phoneNumber: string): string => {
  // Remove all spaces and special characters
  const cleanNumber = phoneNumber.replace(/\s+/g, '');

  // Handle Benin numbers with country code
  if (cleanNumber.startsWith('+229')) {
    const numberWithout229 = cleanNumber.slice(4);
    if (!numberWithout229.startsWith('01')) {
      return `+229 01${numberWithout229}`;
    }
    return cleanNumber;
  }

  // Handle local Benin numbers without country code
  if (/^\d{8}$/.test(cleanNumber) && !cleanNumber.startsWith('01')) {
    return `01${cleanNumber}`;
  }

  // Return unchanged for other international numbers
  return phoneNumber;
};

const internationalBeninPrefixes = ['+229', '229', '00229'];

export const isBeninNumberOld = (phoneNumber: string): boolean => {
  const cleanNumber = phoneNumber.replace(/\s+/g, '');
  return cleanNumber.startsWith('+229') || /^\d{8}$/.test(cleanNumber);
};

export const isBeninNumberHard = (phoneNumber: string): boolean => {

  const validPrefixes = new Set([
    "01", "02", "03", "04", "05", "06", "07", "08", "09",
    "20", "21", "22", "23", "40", "41", "42", "43", "44", "46",
    "50", "51", "52", "53", "54", "55", "56", "57", "58", "59",
    "60", "61", "62", "63", "64", "65", "66", "67", "68", "69",
    "80", "81", "85", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99"
  ]);

  const cleanNumber = phoneNumber.replace(/\s+/g, '');

  // Check if the number starts with +229
  if (internationalBeninPrefixes.some(p => cleanNumber.startsWith(p))) {
    const numberWithoutPrefix = cleanNumber.replace(/^(\+229|229|00229)/, '');
    return numberWithoutPrefix.length === 8 && validPrefixes.has(numberWithoutPrefix.slice(0, 2));
  }

  // Check if the number is 8 digits long and starts with a valid prefix
  if (/^\d{8}$/.test(cleanNumber)) {
    return validPrefixes.has(cleanNumber.slice(0, 2));
  }

  return false;
};

export const isBeninNumber = (phoneNumber: string): boolean => {
  const cleanNumber = phoneNumber.replace(/\s+/g, '');
  const beninPrefixes = ['97', '98', '99', '66', '67', '68', '60', '61', 
    '62', '63', '64', '65', '21', '22', '23', '41', '42', '43', '44', 
    '45', '46', '50', '51', '52', '53', '54', '55', '56', '57', '58', 
    '59', '31', '32', '33', '34', '35', '36', '37', '38', '39', '30', 
    '20', '01', '02', '03', '04', '05', '06', '07', '08', '09', '80', 
    '81', '85', '90', '91', '92', '93', '94', '95'];

  // Check if the number have 8 digits and starts with a valid prefix
  const digits8AndStartsWithBeninPrefixes = () => {
    if (internationalBeninPrefixes.some(p => cleanNumber.startsWith(p))) {
      const numberWithoutPrefix = cleanNumber.replace(/^(\+229|229|00229)/, '');
      return /^\d{8}$/.test(cleanNumber) && beninPrefixes.includes(numberWithoutPrefix.slice(0, 2));
    }
    return /^\d{8}$/.test(cleanNumber) && beninPrefixes.includes(cleanNumber.slice(0, 2));
  }

  // return true if the number starts with a benin prefix or digits8AndStartsWithBeninPrefixes
  return internationalBeninPrefixes.some(p => cleanNumber.startsWith(p)) || digits8AndStartsWithBeninPrefixes();
};