import styled from "styled-components";

const CSeparator = styled.div`
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  ${(props) => props.customStyles}
  div {
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.borderColor};
  }
  span {
    margin: 0px 10px;
    font-weight: 600;
    font-size: 13px;
    color: #737373;
  }
`;

function Separator({ customstyles }) {
  return (
    <CSeparator customstyles={customstyles}>
      <div></div>
      <span>Or</span>
      <div></div>
    </CSeparator>
  );
}

export default Separator;
