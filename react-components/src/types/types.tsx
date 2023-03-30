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
  name: string | undefined;
  surname: string | undefined;
  date: string | undefined;
  planet: string | undefined;
  access: string[];
  typeCrew: string[];
  urlFoto: string | ArrayBuffer | null;
}

export interface ICardProps {
  cardItem: ICards;
}
