import React from "react";

class Register extends React.Component {
  state = {
    email: "",
    password: "",
    name: ""
  };
  onEmail = event => {
    this.setState({ email: event.target.value });
  };
  onPassword = event => {
    this.setState({ password: event.target.value });
  };
  onName = event => {
    this.setState({ name: event.target.value });
  };
  onSubmitRegister = () => {
    fetch("https://detector-backend.herokuapp.com/register", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.routeChange("home");
        }
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <article className="br4 shadow-5 ba  b--black-10 w-100 w-50-m w-25-l mw6 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  onChange={this.onName}
                  id="name"
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  onChange={this.onEmail}
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  onChange={this.onPassword}
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
                onClick={this.onSubmitRegister}
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}
export default Register;
