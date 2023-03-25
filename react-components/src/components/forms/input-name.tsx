import { Component } from 'react';
import React from 'react';

type MyProps = {};
type MyState = {};

export default class InputName extends Component<MyProps, MyState> {
  nameField: React.RefObject<HTMLInputElement>;

  constructor(props: MyProps) {
    super(props);
    this.nameField = React.createRef();
  }

  render() {
    return (
      <input type="text" placeholder="Name" ref={this.nameField} />
    );
  }
}