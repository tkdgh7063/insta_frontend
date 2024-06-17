import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import Photo from "../components/feed/Photo";
import { COMMENT_FRAG } from "../Frag";

const FEED_QUERY = gql`
  query SeeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      isOwn
      isLiked
      file
      caption
      comments {
        ...CommentFrag
      }
      commentsNum
      likes
      createdAt
    }
  }
  ${COMMENT_FRAG}
`;

function Home() {
  const history = useHistory();

  const { data } = useQuery(FEED_QUERY);
  //console.log(data);

  return (
    <div>
      {data?.seeFeed?.map((photo) => (
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  );
}

export default Home;
