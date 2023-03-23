import { Component } from 'react';

type MyProps = {};
type MyState = {};

export default class Forms extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
  }

  render() {
    return (
      <>
        <h1>Form</h1>
      </>
    );
  }
}