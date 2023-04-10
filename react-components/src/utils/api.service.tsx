const API_SEARCH =
  'https://api.themoviedb.org/3/search/movie?api_key=e186f8253c4dd6e459f37348242bb754&query';

export const fetchMovieList = async (valueInput: string) => {
  const url = `${API_SEARCH}=${valueInput}`;
  return (await fetch(url)).json();
};

export const fetchMovie = async (idMovie: number) => {
  const url = `https://api.themoviedb.org/3/movie/${idMovie}?api_key=e186f8253c4dd6e459f37348242bb754`;
  return (await fetch(url)).json();
};
