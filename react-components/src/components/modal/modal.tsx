import { IModalProps, IMovieCard } from '../../types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './modal.scss';
import { MouseEvent, useEffect, useState } from 'react';
import ProgressBar from '../progress-bar/progress-bar';

export default function Modal(props: IModalProps) {
  const API_IMG = 'https://image.tmdb.org/t/p/w300';
  const dataCard = {
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

  const { setOpen, idMovie } = props;
  const [dataMovie, setDataMovie] = useState<IMovieCard>(dataCard);
  const [vision, setVision] = useState(true);
  const closeModal = () => setOpen(false);
  const closeModalOverlay = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      setOpen(false);
    }
  };

  useEffect(() => {
    const getMovie = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${idMovie}?api_key=e186f8253c4dd6e459f37348242bb754`;
        const response = await fetch(url);
        const data = await response.json();
        setDataMovie(data);
        setVision(false);
      } catch (event) {
        console.log(event);
      }
    };

    getMovie();
  }, [idMovie]);

  return (
    <div className="overlay fixed-overlay" data-testid="close-overlay" onClick={closeModalOverlay}>
      <div
        className="modal"
        style={{ top: `calc(450px + ${window.pageYOffset}px)` }}
        data-testid="modal-window"
      >
        <FontAwesomeIcon icon={faXmark} data-testid="close-icon" onClick={closeModal} />
        <ProgressBar spinnerVisibility={vision} />
        <h3>{dataMovie.title}</h3>
        <img src={API_IMG + dataMovie.poster_path} alt="image" width="250" />
        <p>{dataMovie.overview}</p>
        <b>Release Date: </b>
        <span>{dataMovie.release_date}</span>
        <br />
        <b>IMDb: </b>
        <span>{dataMovie.vote_average}</span>
        <br />
        <b>Popularity: </b>
        <span>{dataMovie.popularity}</span>
        <br />
        <b>Genres: </b>
        <span>
          {dataMovie?.genres.map((genre, index) => (
            <span className="genre-name" key={index}>
              {genre.name},{' '}
            </span>
          ))}
        </span>
        <br />
        <b>Production Company: </b>
        <span>
          {dataMovie?.production_companies.map((company, index) => (
            <span key={index}>{company.name}, </span>
          ))}
        </span>
        <br />
        <b>Budget: </b>
        <span>{dataMovie?.budget} $</span>
      </div>
    </div>
  );
}
