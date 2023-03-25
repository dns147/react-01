import { Component, FormEvent } from 'react';
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

type MyProps = {};
type MyState = {};

export default class Forms extends Component<MyProps, MyState> {
  userName: React.RefObject<InputName>;
  userSurname: React.RefObject<InputSurname>;
  userDate: React.RefObject<InputDate>;
  userPlanet: React.RefObject<SelectPlanet>;
  userAccess: React.RefObject<CheckboxAccess>;
  userTypeOfCrew: React.RefObject<RadioTypeOfCrew>;
  userFoto: React.RefObject<InputFile>;

  constructor(props: MyProps) {
    super(props);

    this.userName = React.createRef();
    this.userSurname = React.createRef();
    this.userDate = React.createRef();
    this.userPlanet = React.createRef();
    this.userAccess = React.createRef();
    this.userTypeOfCrew = React.createRef();
    this.userFoto = React.createRef();
  }

  handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    const formDataAccess = new FormData(this.userAccess.current?.accessField.current as HTMLFormElement);
    const formDataTypeOfCrew = new FormData(this.userTypeOfCrew.current?.radioField.current as HTMLFormElement);

    const dataUser: IUserData = {
      name: this.userName.current?.nameField.current?.value,
      surname: this.userSurname.current?.surnameField.current?.value,
      date: this.userDate.current?.dateField.current?.value,
      planet: this.userPlanet.current?.planetField.current?.value,
      access: formDataAccess.getAll('access'),
      typeOfCrew: formDataTypeOfCrew.get('typeOfCrew'),
      foto: this.userFoto.current?.fileField.current?.value
    };

    console.log(dataUser);
  }

  render() {
    return (
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
    );
  }
}