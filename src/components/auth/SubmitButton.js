import styled from "styled-components";

const SubmitButton = styled.input`
  border: none;
  margin-top: 12px;
  background-color: ${(props) => props.theme.skyBlue};
  color: white;
  text-align: center;
  padding: 8px 0px;
  border-radius: 8px;
  font-weight: 600;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.4" : "1")};
`;

export default SubmitButton;
