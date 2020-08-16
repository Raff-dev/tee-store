import React, { Component } from 'react';
import { Items } from './Items';

export class Home extends Component {
  displayName = Home.name

  render() {
    return (
      <div>
        <Items />
      </div>
    );
  }
}
