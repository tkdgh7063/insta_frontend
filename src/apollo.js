import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const TOKEN = "token";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const userLogin = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const userLogout = () => {
  localStorage.removeItem(TOKEN);
  // isLoggedInVar(false);
  // history.replace();
  window.location.reload();
};

export const darkModeVar = makeVar(false);

const httpLink = createHttpLink({
  uri: "http://localhost:4000/",
});

// const uploadLink = createUploadLink({
//   uri: "http://localhost:4000/", // GraphQL 서버 엔드포인트
// });

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: (user) => `User:${user.username}`,
      },
    },
  }),
  connectToDevTools: true,
});
