import { Component, FormEvent, ReactElement } from 'react';
import React from 'react';
import InputName from '../components/forms/input-name';
import '../styles/forms.scss';
import { IUserData } from '../types/types';
import InputSurname from '../components/forms/input-surname';
import InputDate from '../components/forms/input-date';
import SelectPlanet from '../components/forms/select-planet';
import CheckboxAccess from '../components/forms/checkbox-access';
import RadioTypeCrew from '../components/forms/radio-typeofcrew';
import InputFile from '../components/forms/input-file';
import UserCard from '../components/userCard/userCard';
import { getValueCheck, isCapital } from '../utils/utils';

type MyProps = {};
type MyState = {
  users: IUserData[];
  isSaved: boolean;
  isError: boolean;
  isErrorName: boolean;
  isErrorSurname: boolean;
  isErrorDate: boolean;
  isErrorDestination: boolean;
  isErrorAccess: boolean;
  isErrorTypeCrew: boolean;
  isErrorFile: boolean;
};

export default class Forms extends Component<MyProps, MyState> {
  userName: React.RefObject<InputName>;
  userSurname: React.RefObject<InputSurname>;
  userDate: React.RefObject<InputDate>;
  userPlanet: React.RefObject<SelectPlanet>;
  userAccess: React.RefObject<CheckboxAccess>;
  userTypeCrew: React.RefObject<RadioTypeCrew>;
  userFoto: React.RefObject<InputFile>;

  constructor(props: MyProps) {
    super(props);

    this.userName = React.createRef();
    this.userSurname = React.createRef();
    this.userDate = React.createRef();
    this.userPlanet = React.createRef();
    this.userAccess = React.createRef();
    this.userTypeCrew = React.createRef();
    this.userFoto = React.createRef();

    this.state = {
      users: [],
      isSaved: false,
      isError: false,
      isErrorName: false,
      isErrorSurname: false,
      isErrorDate: false,
      isErrorDestination: false,
      isErrorAccess: false,
      isErrorTypeCrew: false,
      isErrorFile: false,
    };
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

  getCheckAccess(): string[] {
    const inputAccess1 = this.userAccess.current?.accessField1.current as HTMLInputElement;
    const inputAccess2 = this.userAccess.current?.accessField2.current as HTMLInputElement;
    const inputAccess3 = this.userAccess.current?.accessField3.current as HTMLInputElement;
    const inputAccess4 = this.userAccess.current?.accessField4.current as HTMLInputElement;
    const inputAccess5 = this.userAccess.current?.accessField5.current as HTMLInputElement;
    const userAccesses = [
      getValueCheck(inputAccess1),
      getValueCheck(inputAccess2),
      getValueCheck(inputAccess3),
      getValueCheck(inputAccess4),
      getValueCheck(inputAccess5),
    ];

    return userAccesses.filter((access) => access);
  }

  getCheckRadio(): string[] {
    const inputTypeCrew1 = this.userTypeCrew.current?.radioField1.current as HTMLInputElement;
    const inputTypeCrew2 = this.userTypeCrew.current?.radioField2.current as HTMLInputElement;
    const userTypeCrew = [getValueCheck(inputTypeCrew1), getValueCheck(inputTypeCrew2)];

    return userTypeCrew.filter((item) => item);
  }

  fillUserInfo(imageUrl: string): void {
    const userAccesses: string[] = this.getCheckAccess();
    const userTypeCrew: string[] = this.getCheckRadio();

    const dataUser: IUserData = {
      name: this.userName.current?.nameField.current?.value,
      surname: this.userSurname.current?.surnameField.current?.value,
      date: this.userDate.current?.dateField.current?.value,
      planet: this.userPlanet.current?.planetField.current?.value,
      access: userAccesses,
      typeCrew: userTypeCrew,
      urlFoto: imageUrl,
    };

    const currentUsers = this.state.users;
    const dataUsers = [...currentUsers, dataUser];

    this.setState({ users: dataUsers });
  }

  clearForm(): void {
    const inputName = this.userName.current?.nameField.current as HTMLInputElement;
    const inputSurname = this.userSurname.current?.surnameField.current as HTMLInputElement;
    const inputDate = this.userDate.current?.dateField.current as HTMLInputElement;
    const selectPlanet = this.userPlanet.current?.planetField.current as HTMLSelectElement;
    const checkboxAccess1 = this.userAccess.current?.accessField1.current as HTMLInputElement;
    const checkboxAccess2 = this.userAccess.current?.accessField2.current as HTMLInputElement;
    const checkboxAccess3 = this.userAccess.current?.accessField3.current as HTMLInputElement;
    const checkboxAccess4 = this.userAccess.current?.accessField4.current as HTMLInputElement;
    const checkboxAccess5 = this.userAccess.current?.accessField5.current as HTMLInputElement;
    const typeCrew1 = this.userTypeCrew.current?.radioField1.current as HTMLInputElement;
    const typeCrew2 = this.userTypeCrew.current?.radioField2.current as HTMLInputElement;
    const inputFile = this.userFoto.current?.fileField.current as HTMLInputElement;

    inputName.value = '';
    inputSurname.value = '';
    inputDate.value = '';
    selectPlanet.value = '';
    checkboxAccess1.checked = false;
    checkboxAccess2.checked = false;
    checkboxAccess3.checked = false;
    checkboxAccess4.checked = false;
    checkboxAccess5.checked = false;
    typeCrew1.checked = false;
    typeCrew2.checked = false;
    inputFile.value = '';
  }

  settingState(value: boolean, state1: {}, state2: {}): void {
    if (value) {
      this.setState(state1);
    } else {
      this.setState(state2);
    }
  }

  handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    const inputName = this.userName.current?.nameField.current as HTMLInputElement;
    const inputSurname = this.userSurname.current?.surnameField.current as HTMLInputElement;
    const inputDate = this.userDate.current?.dateField.current as HTMLInputElement;
    const selectPlanet = this.userPlanet.current?.planetField.current as HTMLSelectElement;
    const inputFile = this.userFoto.current?.fileField.current as HTMLInputElement;
    const userAccesses: string[] = this.getCheckAccess();
    const userTypeCrew: string[] = this.getCheckRadio();

    const isLetterNameCapital = isCapital(inputName.value[0]);
    const isLetterSurnameCapital = isCapital(inputSurname.value[0]);

    this.settingState(!isLetterNameCapital, { isErrorName: true }, { isErrorName: false });
    this.settingState(!isLetterSurnameCapital, { isErrorSurname: true }, { isErrorSurname: false });
    this.settingState(!inputDate.value, { isErrorDate: true }, { isErrorDate: false });
    this.settingState(
      selectPlanet.value === 'default',
      { isErrorDestination: true },
      { isErrorDestination: false }
    );
    this.settingState(userAccesses.length === 0, { isErrorAccess: true }, { isErrorAccess: false });
    this.settingState(
      userTypeCrew.length === 0,
      { isErrorTypeCrew: true },
      { isErrorTypeCrew: false }
    );
    this.settingState(!inputFile.value, { isErrorFile: true }, { isErrorFile: false });

    if (
      !isLetterNameCapital ||
      !isLetterSurnameCapital ||
      !inputDate.value ||
      selectPlanet.value === 'default' ||
      userAccesses.length === 0 ||
      userTypeCrew.length === 0 ||
      !inputFile.value
    ) {
      this.setState({
        isError: true,
      });
    } else {
      this.setState({
        isSaved: true,
        isError: false,
      });

      if (this.userFoto.current?.fileField.current?.files) {
        const file = this.userFoto.current?.fileField.current?.files[0];
        this.getUrlFile(file);
      }
    }
  };

  render() {
    let confirmation: ReactElement;
    let errorName: ReactElement | undefined;
    let errorSurname: ReactElement | undefined;
    let errorDate: ReactElement | undefined;
    let errorDestination: ReactElement | undefined;
    let errorAccess: ReactElement | undefined;
    let errorTypeCrew: ReactElement | undefined;
    let errorFile: ReactElement | undefined;

    if (this.state.isSaved) {
      confirmation = <h2 className="confirmation-message">Data Successfully Saved</h2>;
    } else {
      confirmation = <h2 className="confirmation-message">User Info</h2>;
    }

    if (this.state.isErrorName) {
      errorName = <span className="error-message">name must start with a capital letter</span>;
    } else {
      errorName = <span className="error-message"></span>;
    }

    if (this.state.isErrorSurname) {
      errorSurname = (
        <span className="error-message">surname must start with a capital letter</span>
      );
    } else {
      errorSurname = <span className="error-message"></span>;
    }

    if (this.state.isErrorDate) {
      errorDate = <span className="error-message">no date selected</span>;
    } else {
      errorDate = <span className="error-message"></span>;
    }

    if (this.state.isErrorDestination) {
      errorDestination = <span className="error-message">no destination selected</span>;
    } else {
      errorDestination = <span className="error-message"></span>;
    }

    if (this.state.isErrorAccess) {
      errorAccess = <span className="error-message">no access selected</span>;
    } else {
      errorAccess = <span className="error-message"></span>;
    }

    if (this.state.isErrorTypeCrew) {
      errorTypeCrew = <span className="error-message">no type of crew selected</span>;
    } else {
      errorTypeCrew = <span className="error-message"></span>;
    }

    if (this.state.isErrorFile) {
      errorFile = <span className="error-message">file not selected</span>;
    } else {
      errorFile = <span className="error-message"></span>;
    }

    return (
      <>
        <form id="data-form" data-testid="data-form" onSubmit={this.handleSubmit}>
          <InputName ref={this.userName} />
          {errorName}
          <InputSurname ref={this.userSurname} />
          {errorSurname}
          <InputDate ref={this.userDate} />
          {errorDate}
          <hr />
          <SelectPlanet ref={this.userPlanet} />
          {errorDestination}
          <hr />
          <CheckboxAccess ref={this.userAccess} />
          {errorAccess}
          <hr />
          <RadioTypeCrew ref={this.userTypeCrew} />
          {errorTypeCrew}
          <hr />
          <InputFile ref={this.userFoto} />
          {errorFile}
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
