import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import RegistrazioneForm from "./RegistrazioneForm";
import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

const RegistrazioneLayout = styled.main`
  min-height: 75vh;
  display: grid;
  grid-template-columns: 54rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-white-50);
  transform: scale(0.8);
`;

const Registrazione = () => {
  return (
    <RegistrazioneLayout>
      <Logo />
      <Heading as="h4">Crea un nuovo account</Heading>
      <RegistrazioneForm />
    </RegistrazioneLayout>
  );
};

export default Registrazione;
