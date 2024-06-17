import { useReactiveVar } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faCompass,
  faUser,
  faSquarePlus,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHome,
  faBars,
  faMagnifyingGlass,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import useUser from "../hooks/useUser";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import routes from "../routes";

const CSidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-right: 1px solid ${(props) => props.theme.borderColor};
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 12px 20px 18px;
  & > div:first-of-type {
    padding-top: 10px;
    margin-bottom: 50px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const ContainerInner = styled.div``;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  a {
    display: flex;
    align-items: center;
  }
`;

const Icon = styled.div`
  margin-right: 10px;
  font-size: 20px;
`;

const IconText = styled.div``;

function Sidebar() {
  //const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();

  return (
    <CSidebar>
      <Wrapper>
        <Column>
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </Column>
        <Container>
          <Column>
            <ContainerInner>
              <IconContainer>
                <Link to={routes.home}>
                  <Icon>
                    <FontAwesomeIcon icon={faHome} size="lg" />
                  </Icon>
                  <IconText>Home</IconText>
                </Link>
              </IconContainer>
              <IconContainer>
                <Icon>
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                </Icon>
                <IconText>Search</IconText>
              </IconContainer>
              <IconContainer>
                <Icon>
                  <FontAwesomeIcon icon={faCompass} size="lg" />
                </Icon>
                <IconText>Explore</IconText>
              </IconContainer>
              <IconContainer>
                <Icon>
                  <FontAwesomeIcon icon={faPaperPlane} size="lg" />
                </Icon>
                <IconText>Messages</IconText>
              </IconContainer>
              <IconContainer>
                <Link to={routes.upload}>
                  <Icon>
                    <FontAwesomeIcon icon={faSquarePlus} size="lg" />
                  </Icon>
                  <IconText>Create</IconText>
                </Link>
              </IconContainer>
              <IconContainer>
                <Link to={`/${data?.own?.username}`}>
                  <Icon>
                    {data?.own?.avatar ? (
                      <Avatar url={data?.own?.avatar} />
                    ) : (
                      <FontAwesomeIcon icon={faUser} size="lg" />
                    )}
                  </Icon>
                  <IconText>Profile</IconText>
                </Link>
              </IconContainer>
            </ContainerInner>
          </Column>
          <Column>
            <IconContainer>
              <Icon>
                <FontAwesomeIcon icon={faBars} size="lg" />
              </Icon>
              <IconText>More</IconText>
            </IconContainer>
          </Column>
        </Container>
      </Wrapper>
    </CSidebar>
  );
}

export default Sidebar;
