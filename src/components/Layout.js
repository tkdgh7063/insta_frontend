import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Content = styled.main`
  margin: 0px;
  margin-left: 165px;
  width: 100%;
`;

function Layout({ children }) {
  return (
    <>
      {/* <Header /> */}
      <Sidebar />
      <Content>{children}</Content>
    </>
  );
}

export default Layout;
