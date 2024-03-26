import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import styled from "styled-components";
import { useUser } from "../login/useUser";
import Spinner from "./Spinner";
import { Context } from "../../App";

const FullPage = styled.div`
  height: 100vh;
  background-color: var() (--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  if (isAuthenticated) return <Outlet />;
}

export default ProtectedRoute;
