import { FormEvent, ReactElement, useState } from 'react';
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
import { defaultCheckedInputs, isCapital } from '../utils/utils';

export default function Forms() {
  const [form, setForm] = useState({} as HTMLFormElement);
  const [users, setUsers] = useState([] as IUserData[]);
  const [isSaved, setIsSaved] = useState(false);
  const [isErrorName, setIsErrorName] = useState(false);
  const [isErrorSurname, setIsErrorSurname] = useState(false);
  const [isErrorDate, setIsErrorDate] = useState(false);
  const [isErrorDestination, setIsErrorDestination] = useState(false);
  const [isErrorAccess, setIsErrorAccess] = useState(false);
  const [isErrorTypeCrew, setIsErrorTypeCrew] = useState(false);
  const [isErrorFile, setIsErrorFile] = useState(false);

  function loadFileAsync(file: File): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function getUrlFile(file: File): Promise<void> {
    try {
      const imageUrl = await loadFileAsync(file);
      fillUserInfo(String(imageUrl));
      clearForm();
      setIsSaved(false);
    } catch (err) {
      console.log(err);
    }
  }

  function fillUserInfo(imageUrl: string): void {
    const formData = new FormData(form);
    const dataUser: IUserData = {
      name: formData.get('name') as string,
      surname: formData.get('surname') as string,
      date: formData.get('date') as string,
      planet: formData.get('planet') as string,
      access: formData.getAll('access') as string[],
      typeCrew: formData.get('typeCrew') as string,
      urlFoto: imageUrl,
    };

    const dataUsers = [...users, dataUser];
    setUsers(dataUsers);
  }

  function clearForm(): void {
    const inputName = form['name'] as unknown;
    const inputSurname = form['surname'] as unknown;
    const inputDate = form['date'] as unknown;
    const inputPlanet = form['planet'] as unknown;
    const inputAccesses = form['access'] as HTMLInputElement[];
    const InputTypeCrew = form['typeCrew'] as HTMLInputElement[];
    const InputFile = form['foto'] as unknown;

    (inputName as HTMLInputElement).value = '';
    (inputSurname as HTMLInputElement).value = '';
    (inputDate as HTMLInputElement).value = '';
    (inputPlanet as HTMLSelectElement).value = '';
    defaultCheckedInputs(inputAccesses);
    defaultCheckedInputs(InputTypeCrew);
    (InputFile as HTMLInputElement).value = '';
  }

  function settingState(
    value: boolean,
    nameUseState: React.Dispatch<React.SetStateAction<boolean>>
  ): void {
    if (value) {
      nameUseState(true);
    } else {
      nameUseState(false);
    }
  }

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    setForm(form);
    const formData = new FormData(form);

    const userName = formData.get('name') as string;
    const userSurname = formData.get('surname') as string;
    const uyserDate = formData.get('date') as string;
    const userPlanet = formData.get('planet') as string;
    const userAccesses = formData.getAll('access') as string[];
    const userTypeCrew = formData.get('typeCrew') as string;
    const userFile = formData.get('foto') as File;

    const isLetterNameCapital = isCapital(userName[0]);
    const isLetterSurnameCapital = isCapital(userSurname[0]);

    settingState(!isLetterNameCapital, setIsErrorName);
    settingState(!isLetterSurnameCapital, setIsErrorSurname);
    settingState(!uyserDate, setIsErrorDate);
    settingState(userPlanet === 'default', setIsErrorDestination);
    settingState(userAccesses.length === 0, setIsErrorAccess);
    settingState(!userTypeCrew, setIsErrorTypeCrew);
    settingState(!userFile.name, setIsErrorFile);

    if (
      isLetterNameCapital &&
      isLetterSurnameCapital &&
      uyserDate &&
      userPlanet !== 'default' &&
      userAccesses.length !== 0 &&
      userTypeCrew &&
      userFile.name
    ) {
      setIsSaved(true);
      getUrlFile(userFile);
    }
  };

  let confirmation: ReactElement;
  let errorName: ReactElement | undefined;
  let errorSurname: ReactElement | undefined;
  let errorDate: ReactElement | undefined;
  let errorDestination: ReactElement | undefined;
  let errorAccess: ReactElement | undefined;
  let errorTypeCrew: ReactElement | undefined;
  let errorFile: ReactElement | undefined;

  if (isSaved) {
    confirmation = <h2 className="confirmation-message">Data Successfully Saved</h2>;
  } else {
    confirmation = <h2 className="confirmation-message">User Info</h2>;
  }

  if (isErrorName) {
    errorName = <span className="error-message">name must start with a capital letter</span>;
  } else {
    errorName = <span className="error-message"></span>;
  }

  if (isErrorSurname) {
    errorSurname = <span className="error-message">surname must start with a capital letter</span>;
  } else {
    errorSurname = <span className="error-message"></span>;
  }

  if (isErrorDate) {
    errorDate = <span className="error-message">no date selected</span>;
  } else {
    errorDate = <span className="error-message"></span>;
  }

  if (isErrorDestination) {
    errorDestination = <span className="error-message">no destination selected</span>;
  } else {
    errorDestination = <span className="error-message"></span>;
  }

  if (isErrorAccess) {
    errorAccess = <span className="error-message">no access selected</span>;
  } else {
    errorAccess = <span className="error-message"></span>;
  }

  if (isErrorTypeCrew) {
    errorTypeCrew = <span className="error-message">no type of crew selected</span>;
  } else {
    errorTypeCrew = <span className="error-message"></span>;
  }

  if (isErrorFile) {
    errorFile = <span className="error-message">file not selected</span>;
  } else {
    errorFile = <span className="error-message"></span>;
  }

  return (
    <>
      <form id="data-form" data-testid="data-form" onSubmit={handleSubmit}>
        <InputName />
        {errorName}
        <InputSurname />
        {errorSurname}
        <InputDate />
        {errorDate}
        <hr />
        <SelectPlanet />
        {errorDestination}
        <hr />
        <CheckboxAccess />
        {errorAccess}
        <hr />
        <RadioTypeCrew />
        {errorTypeCrew}
        <hr />
        <InputFile />
        {errorFile}
        <hr />
        <button type="submit">Send</button>
      </form>

      {confirmation}

      <div className="user-cards">
        {users.map((user: IUserData, index: number) => (
          <UserCard key={index} userCardItem={user} />
        ))}
      </div>
    </>
  );
}
