import styled from "styled-components";
import { Outlet } from "react-router";
import Header from "./Header";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout({ children }) {
  return (
    <StyledAppLayout>
      <Header />
      <Main>
        <Container>{children}</Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
