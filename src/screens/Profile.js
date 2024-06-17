import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import SubmitButton from "../components/auth/SubmitButton.js";
import { PHOTO_FRAG } from "../Frag.js";
import useUser, { OWN_QUERY } from "../hooks/useUser.js";

const PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      username
      avatar
      name
      bio
      followers {
        username
      }
      following {
        username
      }
      photos {
        ...PhotoFrag
      }
      isOwnProfile
      isFollowing
      totalFollowers
      totalFollowing
    }
  }
  ${PHOTO_FRAG}
`;

const FOLLOW_MUTATION = gql`
  mutation follow($username: String) {
    follow(username: $username) {
      ok
    }
  }
`;

const UNFOLLOW_MUTATION = gql`
  mutation unfollow($username: String) {
    unfollow(username: $username) {
      ok
    }
  }
`;

const Header = styled.div`
  display: flex;
  margin-top: 50px;
  margin-left: 100px;
`;

const Avatar = styled.img`
  margin-left: 50px;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-right: 150px;
  background-color: #2c2c2c;
`;

const Column = styled.div``;

const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 20px;
  font-size: 16px;
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  margin-right: 20px;
`;

const Value = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const Name = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 0.3fr);
  gap: 30px;
  margin-top: 50px;
`;

const Photo = styled.div`
  background-image: url(${(props) => props.photo});
  background-size: cover;
  position: relative;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const ProfileActionBtn = styled(SubmitButton).attrs({
  as: "span",
})`
  margin-left: 10px;
  margin-top: 0px;
  cursor: pointer;
`;

function Profile() {
  const client = useApolloClient();
  const { username } = useParams();
  //  console.log(username);

  const { data } = useQuery(PROFILE_QUERY, { variables: { username } });
  const { data: userData } = useUser();
  // console.log(data);

  const unfollowUpdate = (cache, result) => {
    const {
      data: {
        unfollow: { ok },
      },
    } = result;

    if (!ok) {
      return;
    }

    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(prevStatus) {
          return false;
        },
        totalFollowers(prevValue) {
          return prevValue - 1;
        },
      },
    });

    const { own } = userData;
    cache.modify({
      id: `User:${own.username}`,
      fields: {
        totalFollowing(prevValue) {
          return prevValue - 1;
        },
      },
    });
  };

  const followCompleted = (data) => {
    // console.log(data);
    const {
      follow: { ok },
    } = data;

    if (!ok) {
      return;
    }

    const { cache } = client;
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(prevStatus) {
          return true;
        },
        totalFollowers(prevValue) {
          return prevValue + 1;
        },
      },
    });

    const { own } = userData;
    cache.modify({
      id: `User:${own.username}`,
      fields: {
        totalFollowing(prevValue) {
          return prevValue + 1;
        },
      },
    });
  };

  const [follow] = useMutation(FOLLOW_MUTATION, {
    variables: { username },

    onCompleted: followCompleted,
  });

  const [unfollow] = useMutation(UNFOLLOW_MUTATION, {
    variables: { username },
    update: unfollowUpdate,
    // onCompleted: unfollowCompleted,
  });

  const getProfileAction = (seeProfile) => {
    const { isOwnProfile, isFollowing } = seeProfile;
    if (isOwnProfile) {
      return <ProfileActionBtn>"Edit Profile"</ProfileActionBtn>;
    } else if (isFollowing) {
      return <ProfileActionBtn onClick={unfollow}>Unfollow</ProfileActionBtn>;
    } else {
      return <ProfileActionBtn onClick={follow}>Follow</ProfileActionBtn>;
    }
  };
  return (
    <div>
      <Header>
        <Avatar src={data?.seeProfile?.avatar} />
        <Column>
          <Row>
            <Username>{data?.seeProfile?.username}</Username>
            {data?.seeProfile ? getProfileAction(data.seeProfile) : null}
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowing}</Value> following
                </span>
              </Item>
            </List>
          </Row>
          <Row>
            <Name>{data?.seeProfile?.name}</Name>
          </Row>
          <Row>{data?.seeProfile?.bio}</Row>
        </Column>
      </Header>
      <Grid>
        {data?.seeProfile?.photos.map((photo) => (
          <Photo photo={photo.file}>
            <Icons>
              <Icon>
                <FontAwesomeIcon icon={faHeart} />
                {photo.likes}
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faComment} />
                {photo.commentsNum}
              </Icon>
            </Icons>
          </Photo>
        ))}
      </Grid>
    </div>
  );
}

export default Profile;
