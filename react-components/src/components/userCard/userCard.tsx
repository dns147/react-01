import { IUserCardProps } from '../../types/types';

export default function UserCard(props: IUserCardProps) {
  const { name, surname, date, planet, access, typeCrew, urlFoto } = props.userCardItem;

  return (
    <>
      <div className="user-cards-item" data-testid="user-cards-item">
        <h3>{String(name) + ' ' + String(surname)}</h3>
        <img src={urlFoto} alt="image" width="70" />;
        <br />
        <b>
          Destination: <span className="access-item item-planet">{planet}</span>
        </b>
        <br />
        <b>
          Departure date: <span className="access-item">{date}</span>
        </b>
        <br />
        <b>
          Access:{' '}
          {access.map((item: string, index: number) => (
            <span className="access-item" key={index}>
              {item}{' '}
            </span>
          ))}
        </b>
        <br />
        <b>
          TypeOfCrew: <span className="access-item">{typeCrew}</span>
        </b>
      </div>
    </>
  );
}
