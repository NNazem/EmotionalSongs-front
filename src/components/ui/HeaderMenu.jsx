import styled from "styled-components";
import Logout from "../login/Logout";
import { Button } from "bootstrap";
import { useNavigate } from "react-router";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useUser } from "../login/useUser";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
  align-self: center;
  margin-bottom: 0;
  margin-right: 1.5rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  return (
    <StyledHeaderMenu>
      {isAuthenticated && (
        <li>
          <Logout />
        </li>
      )}
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
