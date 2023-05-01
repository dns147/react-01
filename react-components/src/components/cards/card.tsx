import { useState } from 'react';
import { ICardProps } from '../../types/types';
import Modal from '../modal/modal';

const API_IMG = 'https://image.tmdb.org/t/p/w300';

export default function Card(props: ICardProps) {
  const { title, poster_path, release_date, id } = props.cardItem;
  const year: string = release_date.split('-')[0];
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);

  return (
    <>
      <div className="item" id={String(props.id)} data-testid="card-item" onClick={openModal}>
        <h3>
          {title} ({year})
        </h3>
        <img src={API_IMG + poster_path} alt="image" width="250" />
      </div>

      {open && <Modal setOpen={setOpen} idMovie={id} />}
    </>
  );
}
