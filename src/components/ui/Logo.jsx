import styled from "styled-components";
import logo from "../../logo.png";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 12.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img
        src={logo}
        alt="profile"
        width="250px"
        className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
      />
    </StyledLogo>
  );
}

export default Logo;
