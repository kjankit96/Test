import React, { Component } from "react";
import "./Header.css";

export default class Header extends Component {

  render() {
    return (
      <div>
        <div className="headers navbar navbar-fixed-top">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12" style={{textAlign:"left", height:"20px"}}>  
                <p style={{marginLeft:"10px", fontSize:"30px", color:"white", marginTop:"0px"}}>Events Dashboard</p>
            </div>
          </div>
        </div>
        <br/><br/><br/>  
      </div>
    );
  }
}
