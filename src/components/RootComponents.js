import React, { Component } from "react";
import Header from "./header/Header";
import Display from "./display/Display";

class RootComponents extends Component {
  render() {
    return (
      <div>
        <Header />
        <Display />
      </div>
    );
  }
}

export default RootComponents;
