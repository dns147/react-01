import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ICardProps } from '../../types/types';
import Modal from '../modal/modal';

const API_IMG = 'https://image.tmdb.org/t/p/w300';
const appRoot = document.getElementById('root') as HTMLElement;

export default function Card(props: ICardProps) {
  const { title, poster_path, release_date, id } = props.cardItem;
  const year: string = release_date.split('-')[0];
  const [open, setOpen] = useState(false);
  const [isLoadImage, setIsLoadImage] = useState(false);
  const [visionLoader, setVisionLoader] = useState(true);
  const openModal = () => setOpen(true);

  const img = new Image();
  img.src = API_IMG + poster_path;
  img.onload = () => {
    setIsLoadImage(true);
    setVisionLoader(false);
  };

  useEffect(() => {
    props.updateLoader(visionLoader);
  });

  return (
    <>
      {isLoadImage && (
        <div className="item" data-testid="card-item" onClick={openModal}>
          <h3>
            {title} ({year})
          </h3>
          <img src={API_IMG + poster_path} alt="image" width="250" />
        </div>
      )}

      {open && createPortal(<Modal setOpen={setOpen} idMovie={id} />, appRoot)}
    </>
  );
}
