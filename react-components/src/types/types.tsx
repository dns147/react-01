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
  id: number;
}

export interface IUserCardProps {
  userCardItem: IUserData;
}

export interface IMoviesProps {
  updateMovies: (value: IMovie[]) => void;
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

export interface IMoviesState {
  list: IMovie[];
  loading1: boolean;
  error1: string | null;
}

export interface IMovieOneState {
  datasMovie: IMovieCard;
  loading2: boolean;
  error2: string | null;
}

export interface IFileLoadState {
  file: string;
  loading: boolean;
  error: string | null;
}

export const defaultMovieData = {
  poster_path: '',
  adult: false,
  overview: '',
  release_date: '',
  id: 0,
  original_title: '',
  original_language: '',
  title: '',
  popularity: 0,
  vote_count: 0,
  video: false,
  vote_average: 0,
  genres: [{ name: '' }],
  production_companies: [{ name: '' }],
  budget: 0,
};
