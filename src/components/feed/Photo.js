import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faHeart,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../Avatar";
import { gql, useMutation } from "@apollo/client";
import Comments from "./Comments";
import { Link } from "react-router-dom";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const PhotoContainer = styled.div`
  width: 50%;
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 25px;
`;

const PhotoHeader = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
`;

const Username = styled.div`
  font-weight: 600;
  margin-left: 10px;
`;

const PhotoBody = styled.img`
  width: 100%;
`;

const PhotoActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    //font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  cursor: pointer;
  margin-right: 10px;
`;

const PhotoFooter = styled.div`
  padding: 15px;
`;

const Likes = styled.span`
  font-weight: 600;
  margin-top: 15px;
  display: block;
  font-size: 14px;
`;

function Photo({
  id,
  user,
  file,
  caption,
  likes,
  comments,
  commentsNum,
  isLiked,
}) {
  const updateLike = (cache, result) => {
    // console.log(data, cache);
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    if (ok) {
      const pid = `Photo:${id}`;
      cache.modify({
        id: pid,
        fields: {
          likes(prevValue) {
            if (isLiked) {
              return prevValue - 1;
            } else {
              return prevValue + 1;
            }
          },
          isLiked(prevStatus) {
            return !prevStatus;
          },
        },
      });
    }
  };
  const [toggleLike, { loading }] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: { id },
    update: updateLike,
  });
  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Avatar url={user.avatar} />
        <Link to={`/${user.username}`}>
          <Username>{user.username}</Username>
        </Link>
      </PhotoHeader>
      <PhotoBody src={file} />
      <PhotoFooter>
        <PhotoActions>
          <div>
            <PhotoAction onClick={toggleLike}>
              <FontAwesomeIcon
                style={{ color: isLiked ? "#FF3040" : "inherit" }}
                icon={isLiked ? solidHeart : faHeart}
                size="2x"
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} size="2x" />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} size="2x" />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} size="2x" />
          </div>
        </PhotoActions>
        <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
        <Comments
          photoId={id}
          author={user.username}
          caption={caption}
          comments={comments}
          commentsNum={commentsNum}
        />
      </PhotoFooter>
    </PhotoContainer>
  );
}

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }),
  file: PropTypes.string.isRequired,
  caption: PropTypes.string,
  likes: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string,
      }),
      comment: PropTypes.string.isRequired,
      isOwn: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ),
  commentsNum: PropTypes.number,
  isLiked: PropTypes.bool.isRequired,
};

export default Photo;
