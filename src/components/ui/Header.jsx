import styled from "styled-components";
import UserAvatar from "./UserAvatar";
import HeaderMenu from "./HeaderMenu";
import logo from "../../logo.png";
import { PiPlaylist } from "react-icons/pi";

import { NavLink } from "react-router-dom";
import {
  HiMiniArrowRight,
  HiOutlineCalendarDays,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineMusicalNote,
} from "react-icons/hi2";
import Logo from "./Logo";
import { useUser } from "../login/useUser";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.4rem;
    font-weight: 500;
    padding: 1rem 2rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;
const Img = styled.img`
  height: 4.6rem;
  width: auto;
`;
function Header() {
  const { isAuthenticated } = useUser();
  return (
    <StyledHeader>
      <NavList>
        <li>
          <StyledNavLink to="/informazioni">
            <Img
              src={logo}
              alt="profile"
              width="250px"
              className="img-fluid profile-image-pic img-thumbnail rounded-circle "
            />
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/informazioni">
            <HiOutlineMusicalNote />
            <span>Canzoni</span>
          </StyledNavLink>
        </li>
        {isAuthenticated && (
          <li>
            <StyledNavLink to="/playlists">
              <PiPlaylist />
              <span>Playlists</span>
            </StyledNavLink>
          </li>
        )}
      </NavList>
      <div style={{ display: "flex", alignItems: "center", gap: "2.4rem" }}>
        <UserAvatar />
        <HeaderMenu />
        {!isAuthenticated && (
          <StyledNavLink to="/emozioni">
            <HiMiniArrowRight />
            <span>Login</span>
          </StyledNavLink>
        )}
      </div>
    </StyledHeader>
  );
}

export default Header;
