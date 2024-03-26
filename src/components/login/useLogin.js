import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "./apiAuth";
import { useContext } from "react";
import { Context } from "../../App";
import toast from "react-hot-toast";

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { session, setSession } = useContext(Context);
  const { mutate: login, isLoading } = useMutation(
    // Defining mutationFn property explicitly
    {
      mutationFn: ({ usernameOrEmail, password }) =>
        loginApi({ usernameOrEmail, password }),
      onSuccess: (user) => {
        setSession(user);
        localStorage.setItem("usernameOrEmail", user.username);
        localStorage.setItem("password", user.password);
        queryClient.setQueryData(["usernameOrEmail"], user.username);
        navigate("/", { replace: true });
      },
      onError: (error) => {
        toast.error("Email o password errati");
      },
    }
  );

  return { login, isLoading, session };
}
