import { Component, FormEvent, ReactElement } from 'react';
import React from 'react';
import InputName from '../components/forms/input-name';
import '../styles/forms.scss';
import { IUserData } from '../types/types';
import InputSurname from '../components/forms/input-surname';
import InputDate from '../components/forms/input-date';
import SelectPlanet from '../components/forms/select-planet';
import CheckboxAccess from '../components/forms/checkbox-access';
import RadioTypeOfCrew from '../components/forms/radio-typeofcrew';
import InputFile from '../components/forms/input-file';
import UserCard from '../components/userCard/userCard';

type MyProps = {};
type MyState = {
  users: IUserData[];
  isSaved: boolean;
};

export default class Forms extends Component<MyProps, MyState> {
  userName: React.RefObject<InputName>;
  userSurname: React.RefObject<InputSurname>;
  userDate: React.RefObject<InputDate>;
  userPlanet: React.RefObject<SelectPlanet>;
  userAccess: React.RefObject<CheckboxAccess>;
  userTypeOfCrew: React.RefObject<RadioTypeOfCrew>;
  userFoto: React.RefObject<InputFile>;
  confirmation: ReactElement | null;

  constructor(props: MyProps) {
    super(props);

    this.userName = React.createRef();
    this.userSurname = React.createRef();
    this.userDate = React.createRef();
    this.userPlanet = React.createRef();
    this.userAccess = React.createRef();
    this.userTypeOfCrew = React.createRef();
    this.userFoto = React.createRef();

    this.state = {
      users: [],
      isSaved: false,
    };

    this.confirmation = null;
  }

  loadFileAsync(file: File): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async getUrlFile(file: File): Promise<void> {
    try {
      const imageUrl = await this.loadFileAsync(file);
      this.fillUserInfo(String(imageUrl));
      this.clearForm();
      this.setState({ isSaved: false });
    } catch (err) {
      console.log(err);
    }
  }

  fillUserInfo(imageUrl: string): void {
    const formDataAccess = new FormData(
      this.userAccess.current?.accessField.current as HTMLFormElement
    );
    const formDataTypeOfCrew = new FormData(
      this.userTypeOfCrew.current?.radioField.current as HTMLFormElement
    );

    const dataUser: IUserData = {
      name: this.userName.current?.nameField.current?.value,
      surname: this.userSurname.current?.surnameField.current?.value,
      date: this.userDate.current?.dateField.current?.value,
      planet: this.userPlanet.current?.planetField.current?.value,
      access: formDataAccess.getAll('access'),
      typeOfCrew: formDataTypeOfCrew.get('typeOfCrew'),
      urlFoto: imageUrl,
    };

    const currentUsers = this.state.users;
    const dataUsers = [...currentUsers, dataUser];

    this.setState({ users: dataUsers });
  }

  clearForm(): void {
    const inputName = this.userName.current?.nameField.current as HTMLInputElement;
    inputName.value = '';
  }

  handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    this.setState({ isSaved: true });

    if (this.userFoto.current?.fileField.current?.files) {
      const file = this.userFoto.current?.fileField.current?.files[0];
      this.getUrlFile(file);
    }
  };

  render() {
    let confirmation: ReactElement;

    if (this.state.isSaved) {
      confirmation = <h2 className="confirmation-message">Data Successfully Saved</h2>;
    } else {
      confirmation = <h2 className="confirmation-message">User Info</h2>;
    }

    return (
      <>
        <form id="data-form" onSubmit={this.handleSubmit}>
          <InputName ref={this.userName} />
          <InputSurname ref={this.userSurname} />
          <InputDate ref={this.userDate} />
          <hr />
          <SelectPlanet ref={this.userPlanet} />
          <hr />
          <CheckboxAccess ref={this.userAccess} />
          <hr />
          <RadioTypeOfCrew ref={this.userTypeOfCrew} />
          <hr />
          <InputFile ref={this.userFoto} />
          <hr />
          <button type="submit">Send</button>
        </form>

        {confirmation}

        <div className="user-cards">
          {this.state.users.map((user: IUserData, index: number) => (
            <UserCard key={index} userData={user} />
          ))}
        </div>
      </>
    );
  }
}
