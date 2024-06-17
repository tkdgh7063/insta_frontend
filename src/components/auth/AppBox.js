import styled from "styled-components";

const CAppBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  div:first-child {
    margin: 10px 20px;
  }
  div:last-child {
    margin: 10px 0px;
  }
  a:first-child img {
    height: 40px;
    width: 134.28px;
    margin-right: 8px;
  }
  a:last-child img {
    height: 40px;
    width: 110.77px;
  }
  span {
    font-size: 14px;
  }
`;

function AppBox() {
  return (
    <CAppBox>
      <div>
        <span>Get the app.</span>
      </div>
      <div>
        <a href="/">
          <img
            alt="playstore"
            src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"
          />
        </a>
        <a href="/">
          <img
            alt="appstore"
            src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"
          />
        </a>
      </div>
    </CAppBox>
  );
}

export default AppBox;
