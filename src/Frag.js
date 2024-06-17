import { gql } from "@apollo/client";

export const PHOTO_FRAG = gql`
  fragment PhotoFrag on Photo {
    id
    file
    likes
    commentsNum
  }
`;

export const COMMENT_FRAG = gql`
  fragment CommentFrag on Comment {
    id
    isOwn
    user {
      avatar
      username
    }
    content
    createdAt
  }
`;
