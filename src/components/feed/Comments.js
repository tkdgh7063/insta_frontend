import styled from "styled-components";
import PropTypes from "prop-types";
import Comment from "./Comment";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import useUser from "../../hooks/useUser";

const CommentContainer = styled.div`
  margin-top: 10px;
`;

const CommentsNumber = styled.span`
  display: block;
  font-size: 12px;
  font-weight: 600;
  margin: 10px 0px;
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($photoId: Int!, $content: String!) {
    createComment(photoId: $photoId, content: $content) {
      ok
      id
      error
    }
  }
`;

function Comments({ photoId, author, caption, comments, commentsNum }) {
  const { register, handleSubmit, getValues, setValue } = useForm();
  const { data: userData } = useUser();
  const commentUpdate = (cache, result) => {
    const { content } = getValues();
    setValue("content", "");
    const {
      data: {
        createComment: { ok, id },
      },
    } = result;

    if (ok && userData?.own) {
      const newComment = {
        __typename: "Comment",
        id,
        content,
        user: {
          ...userData.own,
        },
        isOwn: true,
        createdAt: Date.now() + "",
      };
      //   console.log(newComment);
      const newCache = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment newComment on Comment {
            id
            content
            user {
              username
              avatar
            }
            isOwn
            createdAt
          }
        `,
      });
      //   console.log(newCache);
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          comments: (prevComments) => [...prevComments, newCache],
          commentsNum: (prevValue) => prevValue + 1,
        },
      });
    }
  };
  const [createComment, { loading }] = useMutation(CREATE_COMMENT_MUTATION, {
    update: commentUpdate,
  });
  const onSubmitValid = (data) => {
    // console.log(data);
    const { content } = data;

    if (loading) {
      return;
    }

    createComment({
      variables: {
        photoId,
        content,
      },
    });
  };
  return (
    <CommentContainer>
      <Comment author={author} caption={caption} />
      <CommentsNumber>
        {commentsNum === 1 ? "1 comment" : `${commentsNum} comments`}
      </CommentsNumber>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          photoId={photoId}
          id={comment.id}
          author={comment.user.username}
          caption={comment.content}
          isOwn={comment.isOwn}
        />
      ))}
      <div>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <input
            ref={register({ required: true })}
            name="content"
            type="text"
            placeholder="Add a comment..."
          />
        </form>
      </div>
    </CommentContainer>
  );
}

Comments.propTypes = {
  photoId: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  caption: PropTypes.string,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
      }),
      content: PropTypes.string,
      isOwn: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ),
  commentsNum: PropTypes.number.isRequired,
};

export default Comments;
