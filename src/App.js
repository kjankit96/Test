import './App.css';
import { Component } from 'react';
import Lottie from 'react-lottie';
import lamp from "./lotties/loader.json";
import RootComponents from "./components/RootComponents";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenlogin: "",
      restaurantName: "",
      phoneNo: "",
      id: "",
      restroId: "",
      otp: "",
      urlCustomer: "",
      loading: false
    };
  }

  render() {
    if (!this.state.loading) {
      return (
        <div className="App">
          <BrowserRouter>
            <Route path="/" exact>
              <RootComponents />
            </Route>
          </BrowserRouter>
        </div>
      );
    } else {
      return (
        <div>
          <Loading />
        </div>
      );
    } 
  }
}
class Loading extends Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: lamp,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
    return (
      <div className="container">
        <br />
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <Lottie
              options={defaultOptions}
              height={500}
              width={500}
              style={{marginTop: "65px", marginLeft: "-65px"}}
            />
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    );
  }
}

export default App;
