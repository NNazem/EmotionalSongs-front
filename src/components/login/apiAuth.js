import axios from "axios";
import { useContext } from "react";
import toast from "react-hot-toast";

const API_URL = "http://localhost:8080/api/auth/";

export async function login({ usernameOrEmail, password }) {
  console.log(usernameOrEmail + " " + password);
  try {
    const response = await axios.post(API_URL + "login", {
      usernameOrEmail,
      password,
    });

    if (response.status === 200) {
      return {
        username: usernameOrEmail,
        password: password,
        isLoggedIn: true,
      };
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function signup({
  nome,
  cognome,
  indirizzo,
  email,
  username,
  codiceFiscale,
  password,
}) {
  try {
    const response = await axios.post(API_URL + "register", {
      nome,
      cognome,
      indirizzo,
      email,
      username,
      codiceFiscale,
      password,
    });
    console.log(response);

    if (response.status === 201) {
      return {
        username: username,
        password: password,
        isLoggedIn: true,
      };
    } else {
      throw new Error("Registration failed");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentUser() {
  if (!localStorage.getItem("usernameOrEmail")) {
    return null;
  } else {
    return localStorage.getItem("usernameOrEmail");
  }
}

export async function logout() {
  localStorage.removeItem("usernameOrEmail");
  toast.success("Logout effettuato");
}
