import { Component } from 'react';
import React from 'react';

type MyProps = {};
type MyState = {};

export default class SelectPlanet extends Component<MyProps, MyState> {
  planetField: React.RefObject<HTMLSelectElement>;

  constructor(props: MyProps) {
    super(props);
    this.planetField = React.createRef();
  }

  render() {
    return (
      <label id="select-planet">
        <b>Destination:</b>
        <select name="planet" ref={this.planetField}>
          <option value="mars">Mars</option>
          <option value="jupiter">Jupiter</option>
          <option value="saturn">Saturn</option>
          <option value="neptune">Neptune</option>
        </select>
      </label>
    );
  }
}