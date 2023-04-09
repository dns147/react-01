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

export interface IMovieCard {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
  genres: { name: string }[];
  production_companies: { name: string }[];
  budget: number;
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
  cardItem: IMovie;
  updateLoader: (state: boolean) => void;
}

export interface IUserCardProps {
  userCardItem: IUserData;
}

export interface IMoviesProps {
  updateMovies: (value: IMovie[]) => void;
}

export interface ICardMoviesProps {
  cardsMovies: IMovie[];
  updateLoader: (state: boolean) => void;
}

export interface IProgressBarProps {
  spinnerVisibility: boolean;
}

export interface IModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  idMovie: number;
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
