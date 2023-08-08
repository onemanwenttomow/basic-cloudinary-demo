import Header from "@/components/Header";
import styled from "styled-components";
import GlobalStyle from "../styles";

const StyledWrapper = styled.div`
  height: 100vh; // fallback for browsers that have not implemented dvh
  height: 100dvh;
  display: grid;
  place-items: center;
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <StyledWrapper>
        <GlobalStyle />
        <Component {...pageProps} />
      </StyledWrapper>
    </>
  );
}
