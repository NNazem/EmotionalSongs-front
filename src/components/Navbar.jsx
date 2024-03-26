import React, { useState } from "react";

import {
  leftNavbarItems as LNI,
  rightNavbarItems as RNI,
  applicationName,
  leftNavbarItemsNotLogged,
} from "../utils/constants";
import { Link } from "react-router-dom";
import { useUser } from "./login/useUser";
import Logout from "./login/Logout";
import styled from "styled-components";
import logo from "../logo.png";

const Img = styled.img`
  height: 4rem;
  width: auto;
`;

const Navbar = () => {
  const [leftNavbarItems, setLeftNavbarItems] = useState(LNI);
  const [rightNavbarItems, setRightNavbarItems] = useState(RNI);
  const { isAuthenticated } = useUser();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <Img
            src={logo}
            alt="profile"
            className="img-fluid profile-image-pic img-thumbnail rounded-circle"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          {isAuthenticated ? (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {leftNavbarItems.map((item) => (
                <li className="nav-item" key={item.name.toLowerCase()}>
                  <Link className="nav-link" to={item.path}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {leftNavbarItemsNotLogged.map((item) => (
                <li className="nav-item" key={item.name.toLowerCase()}>
                  <Link className="nav-link" to={item.path}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {!isAuthenticated ? (
            <ul className="navbar-nav mb-2 mb-lg-0">
              {rightNavbarItems.map((item) => (
                <li className="nav-item" key={item.name.toLowerCase()}>
                  <Link className="nav-link" to={item.path}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <Logout />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
