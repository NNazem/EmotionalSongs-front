import React, { useContext } from "react";
import Navbar from "./Navbar";
import { Context } from "../App";
import { Login, Informazioni } from ".";

const Home = () => {
  const { session, setSession } = useContext(Context);
  return <div>{session.isLoggedIn ? <Informazioni /> : <Login />}</div>;
};

export default Home;
