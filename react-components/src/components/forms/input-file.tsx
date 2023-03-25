import { Component } from 'react';
import React from 'react';

type MyProps = {};
type MyState = {};

export default class InputFile extends Component<MyProps, MyState> {
  fileField: React.RefObject<HTMLInputElement>;

  constructor(props: MyProps) {
    super(props);

    this.fileField = React.createRef();
  }

  render() {
    return (
      <>
        <label>
          <b>Upload your foto: </b>
          <input type="file" accept="image/*" ref={this.fileField} />
        </label>
      </>
    );
  }
}
