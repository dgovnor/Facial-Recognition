import React, { Component } from "react";
import Navigation from "./component/Navigation/Navigation";
import Logo from "./component/Logo/Logo";
import Rank from "./component/Rank/Rank";
import Clarifai from "clarifai";
import FaceRecognition from "./component/FaceRecognition/FaceRecognition";
import ImageLinkForm from "./component/imageLinkForm/ImageLinkForm";
import Particles from "react-particles-js";
import Signup from "./component/Signup/Signin";
import Register from "./component/Signup/Register";

import "./App.css";
const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};
const app = new Clarifai.App({
  apiKey: "1c486cd4473e4239bfddebe2232e3ef2"
});
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignIn: false
    };
  }

  boundingBox = data => {
    const clarifaiBox =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("image");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiBox.left_col * width,
      topRow: clarifaiBox.top_row * height,
      rightCol: width - clarifaiBox.right_col * width,
      bottomRow: height - clarifaiBox.bottom_row * height
    };
  };

  displayFaceBox = box => {
    this.setState({ box: box });
  };
  onInputChange = event => {
    this.setState({ input: event.target.value });
  };
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.boundingBox(response)))
      .catch(err => console.log(err));
  };
  onRouteChange = route => {
    if (route === "signout") {
      this.setState({ isSignIn: false });
    } else if (route === "home") {
      this.setState({ isSignIn: true });
    }

    this.setState({ route: route });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <div
          style={{
            display: "flex"
          }}
        >
          <Logo />
          <Navigation
            isSignin={this.state.isSignIn}
            routeChange={this.onRouteChange}
          />
        </div>
        {this.state.route === "home" ? (
          <div>
            <Rank />
            <ImageLinkForm
              input={this.onInputChange}
              submit={this.onButtonSubmit}
            />

            <FaceRecognition box={this.state.box} image={this.state.imageUrl} />
          </div>
        ) : this.state.route === "signin" || this.state.route === 'signout' ? (
          <Signup routeChange={this.onRouteChange} />
        ) : (
          <Register routeChange={this.onRouteChange}/>
        )}
      </div>
    );
  }
}

export default App;
