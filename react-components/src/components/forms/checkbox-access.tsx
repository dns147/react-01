import { Component } from 'react';
import React from 'react';

type MyProps = {};
type MyState = {};

export default class CheckboxAccess extends Component<MyProps, MyState> {
  accessField: React.RefObject<HTMLFormElement>;

  constructor(props: MyProps) {
    super(props);
    this.accessField = React.createRef();
  }

  render() {
    return (
      <>
        <form className="checkbox-access" ref={this.accessField}>
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
        </form>
      </>
    );
  }
}