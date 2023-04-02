import { ReactElement, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import '../styles/forms.scss';
import { IUserData, Inputs } from '../types/types';
import UserCard from '../components/userCard/userCard';

export default function Forms() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'onSubmit',
  });

  const [users, setUsers] = useState([] as IUserData[]);
  const [isSaved, setIsSaved] = useState(false);
  const [data, setData] = useState('');
  let confirmation: ReactElement;

  useEffect(() => {
    localStorage.setItem('formData', data);
  });

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
      const imageUrl = (await loadFileAsync(file)) as string;
      fillUserInfo(imageUrl);
      setIsSaved(false);
    } catch (err) {
      console.log(err);
    }
  }

  function fillUserInfo(imageUrl: string): void {
    const dataFromLocalStorage = JSON.parse(localStorage['formData']);
    const dataUser: IUserData = {
      name: dataFromLocalStorage['name'],
      surname: dataFromLocalStorage['surname'],
      date: dataFromLocalStorage['date'],
      planet: dataFromLocalStorage['planet'],
      access: dataFromLocalStorage['access'],
      typeCrew: dataFromLocalStorage['typeCrew'],
      urlFoto: imageUrl,
    };

    const dataUsers = [...users, dataUser];
    setUsers(dataUsers);
  }

  const onSubmit: SubmitHandler<Inputs> = (form) => {
    const data = JSON.stringify(form);
    setData(data);
    const userFile = form['foto'][0];

    if (isValid) {
      setIsSaved(true);
      getUrlFile(userFile);
      reset();
    }
  };

  if (isSaved) {
    confirmation = <h2 className="confirmation-message">Data Successfully Saved</h2>;
  } else {
    confirmation = <h2 className="confirmation-message">User Info</h2>;
  }

  return (
    <>
      <form id="data-form" data-testid="data-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register('name', {
            validate: (value) => !/^[^A-ZА-ЯЁ]+/.test(value),
            required: 'Name must start with a capital letter.',
            minLength: {
              value: 4,
              message: 'Name must start with a capital letter and min length must be 4.',
            },
          })}
          placeholder="Name"
          data-testid="user-name"
        />
        {errors?.name && (
          <span className="error-message">
            {errors.name?.message || 'Name must start with a capital letter.'}
          </span>
        )}

        <input
          type="text"
          {...register('surname', {
            validate: (value) => !/^[^A-ZА-ЯЁ]+/.test(value),
            required: 'Surname must start with a capital letter.',
            minLength: {
              value: 4,
              message: 'Surname must start with a capital letter and min length must be 4.',
            },
          })}
          placeholder="Surname"
          data-testid="user-surname"
        />
        {errors?.surname && (
          <span className="error-message">
            {errors.surname?.message || 'Surname must start with a capital letter.'}
          </span>
        )}

        <input
          type="date"
          {...register('date', {
            required: 'No date selected.',
          })}
          data-testid="user-date"
        />
        {errors?.date && (
          <span className="error-message">{errors.date?.message || 'No date selected.'}</span>
        )}

        <hr />
        <label id="select-planet">
          <b>Destination:</b>
          <select
            {...register('planet', {
              validate: (value) => !(value === 'default'),
              required: 'No destination selected.',
            })}
            defaultValue=""
            data-testid="user-planet"
          >
            <option data-testid="select-option" value="default"></option>
            <option data-testid="select-option" value="mars">
              Mars
            </option>
            <option data-testid="select-option" value="jupiter">
              Jupiter
            </option>
            <option data-testid="select-option" value="saturn">
              Saturn
            </option>
            <option data-testid="select-option" value="neptune">
              Neptune
            </option>
          </select>
        </label>
        {errors?.planet && (
          <span className="error-message">
            {errors.planet?.message || 'No destination selected.'}
          </span>
        )}

        <hr />
        <div className="checkbox-access">
          <b>Get access:</b>
          <label>
            Control module:
            <input
              type="checkbox"
              aria-label="access-input"
              {...register('access', {
                required: 'No access selected.',
              })}
              value="control"
              data-testid="user-access"
            />
          </label>
          <label>
            Cargo module:
            <input type="checkbox" {...register('access')} value="cargo" />
          </label>
          <label>
            Engine module:
            <input type="checkbox" {...register('access')} value="engine" />
          </label>
          <label>
            Crew module:
            <input type="checkbox" {...register('access')} value="crew" />
          </label>
          <label>
            Medical module:
            <input type="checkbox" {...register('access')} value="medical" />
          </label>
        </div>
        {errors?.access && (
          <span className="error-message">{errors.access?.message || 'No access selected.'}</span>
        )}

        <hr />
        <div className="radio-typeofcrew">
          <b>Type of crew: </b>
          <label>
            <input
              type="radio"
              {...register('typeCrew', {
                required: 'No type crew selected.',
              })}
              value="military"
              data-testid="user-typeCrew"
            />
            Military
          </label>
          <label>
            <input
              type="radio"
              {...register('typeCrew', {
                required: 'No type crew selected.',
              })}
              value="civilian"
            />
            Civilian
          </label>
        </div>
        {errors?.typeCrew && (
          <span className="error-message">
            {errors.typeCrew?.message || 'No type crew selected.'}
          </span>
        )}

        <hr />
        <label>
          <b>Upload your foto: </b>
          <input
            type="file"
            {...register('foto', {
              required: 'File not selected.',
            })}
            accept="image/*"
            data-testid="user-file"
          />
        </label>
        {errors?.foto && (
          <span className="error-message">{errors.foto?.message || 'File not selected.'}</span>
        )}

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
