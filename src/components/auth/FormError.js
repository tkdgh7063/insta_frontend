import styled from "styled-components";

const CFormError = styled.span`
  color: tomato;
  font-weight: 600;
  font-size: 12px;
  margin: 5px 0px;
  display: flex;
  justify-content: center;
`;

function FormError({ message }) {
  return message === "" || !message ? null : <CFormError>{message}</CFormError>;
}

export default FormError;
