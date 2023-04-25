import { ReactElement, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import '../styles/forms.scss';
import { IUserData, Inputs } from '../types/types';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { addUser } from '../features/usersSlice';
import UsersCard from '../components/userCard/usersCard';
import { fetchLoadFile } from '../features/fileLoadSlice';

export default function Forms() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'onSubmit',
  });

  const dispatch = useAppDispatch();
  const { file, loading } = useAppSelector((state) => state.fileLoad);
  const [data, setData] = useState({} as IUserData);
  const [cloneData, setCloneData] = useState({} as IUserData);
  const [fullData, setFullData] = useState({} as IUserData);
  const [isLoadFile, setIsLoadFile] = useState(false);
  let confirmation: ReactElement;

  useEffect(() => {
    if (loading) {
      const cloneData = { ...data };
      setCloneData(cloneData);

      setIsLoadFile(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (isLoadFile) {
      const fullData = { ...cloneData };
      fullData.urlFoto = file;
      setFullData(fullData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  useEffect(() => {
    if (isLoadFile) {
      dispatch(addUser(fullData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, fullData]);

  const onSubmit: SubmitHandler<Inputs> = (form) => {
    if (isValid) {
      const userFile = form['foto'][0];
      dispatch(fetchLoadFile(userFile));

      const dataUser: IUserData = {
        name: form['name'],
        surname: form['surname'],
        date: form['date'],
        planet: form['planet'],
        access: form['access'],
        typeCrew: form['typeCrew'],
        urlFoto: file,
      };

      setData(dataUser);
      reset();
    }
  };

  if (loading) {
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
          <span className="error-message" data-testid="user-name-error">
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
            <input type="checkbox" {...register('access')} value="crew" data-testid="user-access-crew" />
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

      <UsersCard />
    </>
  );
}
