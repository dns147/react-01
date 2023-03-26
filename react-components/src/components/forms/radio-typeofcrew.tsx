import { Component } from 'react';
import React from 'react';

type MyProps = {};
type MyState = {};

export default class RadioTypeCrew extends Component<MyProps, MyState> {
  radioField1: React.RefObject<HTMLInputElement>;
  radioField2: React.RefObject<HTMLInputElement>;

  constructor(props: MyProps) {
    super(props);

    this.radioField1 = React.createRef();
    this.radioField2 = React.createRef();
  }

  render() {
    return (
      <>
        <div className="radio-typeofcrew">
          <b>Type of crew: </b>
          <label>
            <input type="radio" name="typeCrew" value="military" ref={this.radioField1} />
            Military
          </label>
          <label>
            <input type="radio" name="typeCrew" value="civilian" ref={this.radioField2} />
            Civilian
          </label>
        </div>
      </>
    );
  }
}
