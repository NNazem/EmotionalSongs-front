import { useState } from "react";
import SpinnerMini from "../ui/SpinnerMini";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Form from "../ui/Form";
import FormRowVertical from "../ui/FormRowVertical";
import useLogin from "./useLogin";
import toast from "react-hot-toast";
import ButtonText from "../ui/ButtonText";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FlexRow = styled.div`
  display: flex;
  align-items: center;
`;

function LoginForm() {
  const [username, setUsername] = useState("Prova4@gmail.com");
  const [password, setPassword] = useState("Prova4");
  const navigate = useNavigate();
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Username e password sono obbligatori");
      return;
    }
    login({ usernameOrEmail: username, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Username">
        <Input
          type="userame"
          id="userame"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <FlexRow>
          <span>Non sei registrato?</span>&nbsp;
          <ButtonText type="button" onClick={() => navigate("/registrazione")}>
            Registrati
          </ButtonText>
        </FlexRow>
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "Login" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
