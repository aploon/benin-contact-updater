export interface Contact {
  id: string;
  fullName: string;
  phoneNumbers: {
    original: string;
    updated: string;
    type: string;
  }[];
  modified: boolean;
}