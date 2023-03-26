import { Component } from 'react';
import React from 'react';

type MyProps = {};
type MyState = {};

export default class CheckboxAccess extends Component<MyProps, MyState> {
  accessField1: React.RefObject<HTMLInputElement>;
  accessField2: React.RefObject<HTMLInputElement>;
  accessField3: React.RefObject<HTMLInputElement>;
  accessField4: React.RefObject<HTMLInputElement>;
  accessField5: React.RefObject<HTMLInputElement>;

  constructor(props: MyProps) {
    super(props);

    this.accessField1 = React.createRef();
    this.accessField2 = React.createRef();
    this.accessField3 = React.createRef();
    this.accessField4 = React.createRef();
    this.accessField5 = React.createRef();
  }

  render() {
    return (
      <>
        <div className="checkbox-access">
          <b>Get access:</b>
          <label>
            Control module:
            <input type="checkbox" name="access" value="control" ref={this.accessField1} />
          </label>
          <label>
            Cargo module:
            <input type="checkbox" name="access" value="cargo" ref={this.accessField2} />
          </label>
          <label>
            Engine module:
            <input type="checkbox" name="access" value="engine" ref={this.accessField3} />
          </label>
          <label>
            Crew module:
            <input type="checkbox" name="access" value="crew" ref={this.accessField4} />
          </label>
          <label>
            Medical module:
            <input type="checkbox" name="access" value="medical" ref={this.accessField5} />
          </label>
        </div>
      </>
    );
  }
}
