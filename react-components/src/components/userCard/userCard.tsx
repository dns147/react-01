import { Component } from 'react';
import { IUserData } from '../../types/types';

type MyProps = { userData: IUserData };
type MyState = {};

export default class UserCard extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
  }

  render() {
    const { name, surname, date, planet, access, typeOfCrew, urlFoto } = this.props.userData;
    let imageUser = null;

    if (urlFoto) {
      const srcImage = String(urlFoto);
      imageUser = <img src={srcImage} alt="image" width="70" />;
    }

    return (
      <>
        <div className="user-cards-item">
          <h3>{String(name) + ' ' + String(surname)}</h3>
          {imageUser}
          <p>{planet}</p>
          <p>{date}</p>
          <b>Access: {String(access[0])}</b>
          <br />
          <b>TypeOfCrew: {String(typeOfCrew)}</b>
        </div>
      </>
    );
  }
}
