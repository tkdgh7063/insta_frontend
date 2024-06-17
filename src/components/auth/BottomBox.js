import { Link } from "react-router-dom";
import styled from "styled-components";
import { WhiteBox } from "../common";

const CBottomBox = styled(WhiteBox)`
  padding: 20px 0px;
  text-align: center;
  font-size: 14px;
  a {
    font-weight: 600;
    color: ${(props) => props.theme.blue};
    margin-left: 4px;
  }
`;

function BottomBox({ cta, link, linkText }) {
  return (
    <CBottomBox>
      <span>{cta}</span>
      <Link to={link}>{linkText}</Link>
    </CBottomBox>
  );
}

export default BottomBox;
