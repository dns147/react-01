import { describe, test, expect, vi, Mock } from 'vitest';
import { fetchMovieList, fetchMovie } from './api.service';
import { IMovie, IMovieCard } from '../types/types';

global.fetch = vi.fn();

describe('test api component', () => {
  function createFetchMovieListResponse(data: IMovie[]) {
    return { json: () => new Promise((resolve) => resolve(data)) };
  }

  function createFetchMovieResponse(data: IMovieCard) {
    return { json: () => new Promise((resolve) => resolve(data)) };
  }

  const API_SEARCH =
    'https://api.themoviedb.org/3/search/movie?api_key=e186f8253c4dd6e459f37348242bb754&query';

  test('makes request to fetch and return data list movie', async () => {
    const moviesListResponse: IMovie[] = [
      {
        poster_path: '',
        adult: false,
        overview: '',
        release_date: '',
        genre_ids: [],
        id: 0,
        original_title: '',
        original_language: '',
        title: '',
        backdrop_path: '',
        popularity: 0,
        vote_count: 0,
        video: false,
        vote_average: 0,
      },
    ];

    const valueInput = 'Rocky';

    (fetch as Mock).mockResolvedValue(createFetchMovieListResponse(moviesListResponse));

    const moviesList = await fetchMovieList(valueInput);

    expect(fetch).toHaveBeenCalledWith(`${API_SEARCH}=${valueInput}`);

    expect(moviesList).toStrictEqual(moviesListResponse);
  });

  test('makes request to fetch and return data movie', async () => {
    const movieResponse: IMovieCard = {
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

    const idMovie = 11760;

    (fetch as Mock).mockResolvedValue(createFetchMovieResponse(movieResponse));

    const movie = await fetchMovie(idMovie);

    expect(fetch).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/movie/${idMovie}?api_key=e186f8253c4dd6e459f37348242bb754`
    );

    expect(movie).toStrictEqual(movieResponse);
  });
});
