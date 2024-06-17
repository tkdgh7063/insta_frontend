import styled from "styled-components";

const CAvatar = styled.div`
  width: ${(props) => (props.lg ? "32px" : "24px")};
  height: ${(props) => (props.lg ? "32px" : "24px")};
  border-radius: 50%;
  background-color: black;
  overflow: hidden;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Img = styled.img`
  max-width: 100%;
`;

function Avatar({ url = "", lg }) {
  return <CAvatar lg={lg}>{url !== "" ? <Img src={url} /> : null}</CAvatar>;
}

export default Avatar;
