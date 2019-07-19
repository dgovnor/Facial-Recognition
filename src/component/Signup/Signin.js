import React from "react";

class Signin extends React.Component {
  state = {
    signEmail: "",
    signPassword: ""
  };
  onSignEmail = event => {
    this.setState({ signEmail: event.target.value });
  };
  onSignPassword = event => {
    this.setState({ signPassword: event.target.value });
  };
  onSubmitSignin = () => {
    fetch("http://localhost:3001/signin", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: this.state.signEmail,
        password: this.state.signPassword
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
    const { routeChange } = this.props;
    return (
      <article className="br4 shadow-5  ba  b--black-10 mv1 w-100 w-50-m w-25-l mw6 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  onChange={this.onSignEmail}
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
                  onChange={this.onSignPassword}
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={this.onSubmitSignin}
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => routeChange("register")}
                href="#0"
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}
export default Signin;
