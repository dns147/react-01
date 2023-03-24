export interface ICards {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  category: string;
  images: string;
}

const date = new Date();

export interface IFoto {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string,
  webkitRelativePath: string;
}

export interface IUserData {
  name: FormDataEntryValue | null;
  surname: FormDataEntryValue | null;
  date: FormDataEntryValue | null;
  planet: FormDataEntryValue | null;
  access: FormDataEntryValue[],
  typeOfCrew: FormDataEntryValue | null;
  foto: any;
}
