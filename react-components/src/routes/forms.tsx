import { ChangeEvent, Component, FormEvent } from 'react';
import '../styles/forms.scss';
import { IFoto, IUserData } from '../types/types';

type MyProps = {};
type MyState = { 
  userData: IUserData,
};

export default class Forms extends Component<MyProps, MyState> {
  date: Date;

  constructor(props: MyProps) {
    super(props);

    this.date = new Date('2023, 0, 22');

    this.state = { userData: {
      name: '',
      surname: '',
      date: '',
      planet: '',
      access: [],
      typeOfCrew: '',
      foto: ''
    }};
  }

  handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const data: IUserData = {
      name: formData.get('name'),
      surname: formData.get('surname'),
      date: formData.get('date'),
      planet: formData.get('planet'),
      access: formData.getAll('access'),
      typeOfCrew: formData.get('typeOfCrew'),
      foto: formData.get('foto'),
    };

    this.setState({ userData: data });

    console.log(data);
    console.log(this.state.userData);
  }

  render() {
    return (
      <form id="data-form" onSubmit={this.handleSubmit}>
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="surname" placeholder="Surname" />
        <input type="date" name="date" />
        
        <hr />
        <label id="select-planet">
          Destination:
          <select name="planet">
            <option value="mars">Mars</option>
            <option value="jupiter">Jupiter</option>
            <option value="saturn">Saturn</option>
            <option value="neptune">Neptune</option>
          </select>
        </label>
        
        <hr />
        <b>Get access:</b>
        <label>
          Control module: 
          <input type="checkbox" name="access" value="control" />
        </label>
        <label>
          Cargo module: 
          <input type="checkbox" name="access" value="cargo" />
        </label>
        <label>
          Engine module: 
          <input type="checkbox" name="access" value="engine" />
        </label>
        <label>
          Crew module: 
          <input type="checkbox" name="access" value="crew" />
        </label>
        <label>
          Medical module: 
          <input type="checkbox" name="access" value="medical" />
        </label>
        
        <hr />
        <p>
          Type of crew:
          <label>
            <input type="radio" name="typeOfCrew" value="military" />
            Military
          </label>
          <label>
            <input type="radio" name="typeOfCrew" value="civilian" />
            Civilian
          </label>
        </p>

        <hr />
        <label>
          Upload your foto:
          <input type="file" name="foto" accept="image/*" />
        </label>

        <hr />
        <button type="submit">Send</button>
      </form>
    );
  }
}