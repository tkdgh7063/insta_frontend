import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, userLogout } from "../apollo";

export const OWN_QUERY = gql`
  query Own {
    own {
      id
      username
      avatar
    }
  }
`;

function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery(OWN_QUERY, { skip: !hasToken });
  // console.log(data);
  useEffect(() => {
    if (data?.seeOwnProfile === null) {
      userLogout();
    }
  }, [data]);
  return { data };
}

export default useUser;
