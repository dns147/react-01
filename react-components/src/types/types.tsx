export interface IMovie {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

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

export interface ICardArrayProps {
  cardsItem: ICards[];
}

export interface IMoviesProps {
  updateMovies: (value: IMovie[]) => void;
}

export interface ICardMoviesProps {
  cardsMovies: IMovie[];
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
