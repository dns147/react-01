import { Component } from 'react';
import React from 'react';

type MyProps = {};
type MyState = {};

export default class InputDate extends Component<MyProps, MyState> {
  dateField: React.RefObject<HTMLInputElement>;

  constructor(props: MyProps) {
    super(props);
    this.dateField = React.createRef();
  }

  render() {
    return <input type="date" ref={this.dateField} />;
  }
}
