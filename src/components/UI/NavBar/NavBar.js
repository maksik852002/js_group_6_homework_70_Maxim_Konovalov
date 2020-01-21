import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";

class NavBar extends Component {
  state = {
    isClicked: false
  };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  handleClose = () => {
    this.setState({ clicked: false });
  };

  render = () => {
    let show = "collapse navbar-collapse justify-content-end";
    this.state.clicked && (show += " d-block");
    return (
      <header className="w-100">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              <img
                src="https://p.w3layouts.com/demos/port/web/images/logo.png"
                alt="logo"
              />
            </NavLink>
            <Button
              label={<span className="navbar-toggler-icon"></span>}
              type="button"
              addClass="navbar-toggler"
              click={this.handleClick}
            />
            <div className={show}>
              <ul onClick={this.handleClose} className="navbar-nav">
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  };
}

export default NavBar;