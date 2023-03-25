import { Component } from 'react';
import React from 'react';

type MyProps = {};
type MyState = {};

export default class InputSurname extends Component<MyProps, MyState> {
  surnameField: React.RefObject<HTMLInputElement>;

  constructor(props: MyProps) {
    super(props);
    this.surnameField = React.createRef();
  }

  render() {
    return (
      <input type="text" placeholder="Surname" ref={this.surnameField} />
    );
  }
}