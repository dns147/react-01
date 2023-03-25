import { Component } from 'react';
import React from 'react';

type MyProps = {};
type MyState = {};

export default class RadioTypeOfCrew extends Component<MyProps, MyState> {
  radioField: React.RefObject<HTMLFormElement>;

  constructor(props: MyProps) {
    super(props);
    this.radioField = React.createRef();
  }

  render() {
    return (
      <>
        <form className="radio-typeofcrew" ref={this.radioField}>
          <b>Type of crew: </b>
          <label>
            <input type="radio" name="typeOfCrew" value="military" />
            Military
          </label>
          <label>
            <input type="radio" name="typeOfCrew" value="civilian" />
            Civilian
          </label>
        </form>
      </>
    );
  }
}