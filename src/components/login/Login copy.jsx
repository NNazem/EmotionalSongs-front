import React, { useContext, useState } from "react";
import { Context } from "../../App";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import useLogin from "./useLogin";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useLogin();

  const [loginFormData, setLoginFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (!loginFormData.usernameOrEmail || !loginFormData.password) {
      toast.error("Compila tutti i campi");
      return;
    }

    login({
      usernameOrEmail: loginFormData.usernameOrEmail,
      password: loginFormData.password,
    });
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h2 className="text-center text-dark">Login</h2>
        <div className="card">
          <form
            className="card-body cardbody-color p-lg-5"
            onSubmit={handleSumbit}
          >
            <div className="text-center">
              <img
                src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="200px"
                alt="profile"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Username o email"
                value={loginFormData.usernameOrEmail}
                name="usernameOrEmail"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={loginFormData.password}
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-color px-5 mb-3 w-100">
                Login
              </button>
            </div>
            <div id="emailHelp" className="form-text text-center text-dark">
              Non sei registrato?
              <Link to="/registrazione" className="text-dark fw-bold">
                {" "}
                Crea un account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
