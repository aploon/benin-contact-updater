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

export const isBeninNumber = (phoneNumber: string): boolean => {
  const cleanNumber = phoneNumber.replace(/\s+/g, '');
  return cleanNumber.startsWith('+229') || /^\d{8}$/.test(cleanNumber);
};