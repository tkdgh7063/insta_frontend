import styled from "styled-components";
import PropTypes from "prop-types";
import sanitizeHtml from "sanitize-html";
import React from "react";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const CommentContainer = styled.div``;

const Author = styled.span`
  font-weight: 600;
  margin-right: 8px;
`;

const Content = styled.span`
  a {
    cursor: pointer;
    background-color: white;
    font-weight: 600;
    color: #385898;
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($deleteCommentId: Int!) {
    deleteComment(id: $deleteCommentId) {
      ok
      error
    }
  }
`;

function Comment({ photoId, id, author, caption, isOwn }) {
  const updateDelete = (cache, result) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;

    if (ok) {
      cache.evict({ id: `Comment:${id}` });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentsNum: (prevValue) => prevValue - 1,
        },
      });
    }
  };

  const onDelete = () => {
    deleteComment();
  };

  const [deleteComment, { loading }] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      deleteCommentId: id,
    },
    update: updateDelete,
  });

  return (
    <CommentContainer>
      <Link to={`/${author}`}>
        <Author>{author}</Author>
      </Link>
      <Content>
        {caption.split(" ").map((w, index) =>
          /#[\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/.test(w) ? (
            <React.Fragment key={index}>
              <Link to={`/hashtags/${w}`}>{w}</Link>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{w} </React.Fragment>
          )
        )}
      </Content>
      {isOwn ? <button onClick={onDelete}>X</button> : null}
    </CommentContainer>
  );
}

Comment.propTypes = {
  photoId: PropTypes.number,
  id: PropTypes.number,
  author: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  isOwn: PropTypes.bool,
};

export default Comment;
