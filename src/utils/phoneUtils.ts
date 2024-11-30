const internationalBeninPrefixes = ['+229', '229', '00229'];

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

export const isBeninNumberOld = (phoneNumber: string): boolean => {
  const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
  return cleanNumber.startsWith('+229') || /^\d{8}$/.test(cleanNumber);
};

export const isBeninNumber = (phoneNumber: string): boolean => {
  const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
  const beninPrefixes = new Set([
    '97', '98', '99', '66', '67', '68', '60', '61', '62', '63', '64', '65',
    '21', '22', '23', '41', '42', '43', '44', '45', '46', '50', '51', '52',
    '53', '54', '55', '56', '57', '58', '59', '31', '32', '33', '34', '35',
    '36', '37', '38', '39', '30', '20', '01', '02', '03', '04', '05', '06',
    '07', '08', '09', '80', '81', '85', '90', '91', '92', '93', '94', '95'
  ]);

  // check if the number is an international benin number
  if (internationalBeninPrefixes.some(prefix => cleanNumber.startsWith(prefix))) {
    return true;
  }

  // check if the number is a valid Benin number
  return (
    /^\d{8}$/.test(cleanNumber) &&
    beninPrefixes.has(cleanNumber.slice(0, 2))
  );
};