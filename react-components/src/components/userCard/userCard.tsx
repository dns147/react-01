import { Component } from 'react';
import { IUserData } from '../../types/types';

type MyProps = { userData: IUserData };
type MyState = {};

export default class UserCard extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
  }

  render() {
    const { name, surname, date, planet, access, typeCrew, urlFoto } = this.props.userData;
    let imageUser = null;

    if (urlFoto) {
      const srcImage = String(urlFoto);
      imageUser = <img src={srcImage} alt="image" width="70" />;
    }

    return (
      <>
        <div className="user-cards-item" data-testid="user-cards-item">
          <h3>{String(name) + ' ' + String(surname)}</h3>
          {imageUser}
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
            TypeOfCrew: <span className="access-item">{typeCrew[0]}</span>
          </b>
        </div>
      </>
    );
  }
}
