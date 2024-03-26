import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { logout as logoutApi } from "./apiAuth";
import toast from "react-hot-toast";

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.invalidateQueries("usernameOrEmail"); // Invalidate the 'usernameOrEmail' query
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Errore nel logout");
    },
  });

  return { logout, isLoading };
}
