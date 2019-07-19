import React, { Component } from "react";
import Navigation from "./component/Navigation/Navigation";
import Logo from "./component/Logo/Logo";
import Rank from "./component/Rank/Rank";
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

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: "",
    joined: ""
  }
};
class App extends Component {
  constructor(prop) {
    super(prop);
    this.state = initialState;
  }

  loadUser = user => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
      }
    });
  };
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
    fetch("http://localhost:3001/imageurl", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ input: this.state.input })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch("http://localhost:3001/image", {
            method: "put",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ id: this.state.user.id })
          })
            .then(res => res.json())
            .then(user => {
              if (user) {
                this.setState(
                  Object.assign(this.state.user, { entries: user })
                );
              }
            })
            .catch(err => console.log(err));
        }

        this.displayFaceBox(this.boundingBox(response));
      })
      .catch(err => console.log(err));
  };
  onRouteChange = route => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignIn: true });
    }

    return this.setState({ route: route });
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
            <Rank rank={this.state.user} />
            <ImageLinkForm
              input={this.onInputChange}
              submit={this.onButtonSubmit}
            />

            <FaceRecognition box={this.state.box} image={this.state.imageUrl} />
          </div>
        ) : this.state.route === "signin" || this.state.route === "signout" ? (
          <Signup loadUser={this.loadUser} routeChange={this.onRouteChange} />
        ) : (
          <Register loadUser={this.loadUser} routeChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
