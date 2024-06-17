import styled from "styled-components";

export const WhiteBox = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
`;

export const FatText = styled.div`
  font-weight: 600;
  color: #737373;
`;
