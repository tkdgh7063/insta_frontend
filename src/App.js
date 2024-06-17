import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import SignUp from "./screens/SignUp";
import routes from "./routes";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Profile from "./screens/Profile";
import Upload from "./screens/Upload";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Router>
          <Switch>
            <Route path={routes.home} exact>
              {isLoggedIn ? (
                <Layout>
                  <Home />
                </Layout>
              ) : (
                <Login />
              )}
            </Route>
            {!isLoggedIn ? (
              <Route path={routes.signUp}>
                <SignUp />
              </Route>
            ) : null}
            <Route path={routes.upload} exact>
              {isLoggedIn ? (
                <Layout>
                  <Upload />
                </Layout>
              ) : (
                <Route path={routes.signUp}>
                  <SignUp />
                </Route>
              )}
            </Route>
            <Route path={`/:username`}>
              <Layout>
                <Profile />
              </Layout>
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
