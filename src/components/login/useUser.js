import { useContext } from "react";
import { Context } from "../../App";
import { useQuery } from "react-query";
import { getCurrentUser } from "./apiAuth";

export function useUser() {
  const { isLoading, data: usernameOrEmail } = useQuery({
    queryKey: [`usernameOrEmail`],
    queryFn: getCurrentUser,
  });

  return {
    isLoading,
    usernameOrEmail,
    isAuthenticated: usernameOrEmail ? true : false,
  };
}
