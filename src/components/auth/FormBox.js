import styled from "styled-components";
import { WhiteBox } from "../common";

const Container = styled(WhiteBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 35px 25px 35px;
  margin-bottom: 10px;
  form {
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
  }
`;

function FormBox({ children }) {
  return <Container>{children}</Container>;
}

export default FormBox;
