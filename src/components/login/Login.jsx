import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import LoginForm from "./LoginForm";

const LoginLayout = styled.main`
  min-height: 75vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-white-0);
  transform: scale(0.8);
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Effettua il login nel tuo account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
