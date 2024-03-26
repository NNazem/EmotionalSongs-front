import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signup as signupApi } from "../login/apiAuth";
import { Context } from "../../App";
import { useMutation } from "react-query";
import toast from "react-hot-toast";

export default function useSignup() {
  const navigate = useNavigate();
  const { session, setSession } = useContext(Context);

  const { mutate: signup, isLoading } = useMutation(
    // Defining mutationFn property explicitly
    {
      mutationFn: ({
        nome,
        cognome,
        indirizzo,
        email,
        username,
        codiceFiscale,
        password,
      }) =>
        signupApi({
          nome,
          cognome,
          indirizzo,
          email,
          username,
          codiceFiscale,
          password,
        }),
      onSuccess: (user) => {
        setSession(user);
        navigate("/");
      },
      onError: (error) => {
        toast.error("Errore nella registrazione");
      },
    }
  );

  return { signup, isLoading, session };
}
