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

export interface IUserData {
  name: string;
  surname: string;
  date: string;
  planet: string;
  access: string[];
  typeCrew: string;
  urlFoto?: string;
}

export interface ICardProps {
  cardItem: ICards;
}

export interface IUserCardProps {
  userCardItem: IUserData;
}

export type Inputs = {
  name: string;
  surname: string;
  date: string;
  planet: string;
  access: string[];
  typeCrew: string;
  foto: FileList;
};
