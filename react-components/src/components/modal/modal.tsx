import { IModalProps } from '../../types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './modal.scss';
import { MouseEvent, useEffect } from 'react';
import ProgressBar from '../progress-bar/progress-bar';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { fetchOneMovie } from '../../features/movieOneSlice';

export default function Modal(props: IModalProps) {
  const API_IMG = 'https://image.tmdb.org/t/p/w300';
  const dispatch = useAppDispatch();
  const dataMovie = useAppSelector((state) => state.movie.datasMovie);
  const { setOpen, idMovie } = props;

  const closeModal = () => setOpen(false);

  const closeModalOverlay = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      setOpen(false);
    }
  };

  useEffect(() => {
    dispatch(fetchOneMovie(idMovie));
  }, [dispatch, idMovie]);

  return (
    <div className="overlay fixed-overlay" data-testid="close-overlay" onClick={closeModalOverlay}>
      <div className="modal" data-testid="modal-window">
        <FontAwesomeIcon icon={faXmark} data-testid="close-icon" onClick={closeModal} />
        <ProgressBar nameApiRequest={'movie'} />
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
