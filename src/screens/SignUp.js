import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import SubmitButton from "../components/auth/SubmitButton";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import AppBox from "../components/auth/AppBox";
import styled from "styled-components";
import { FatText } from "../components/common";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
//import PageTitle from "../components/PageTitle";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Description = styled(FatText)`
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  text-align: center;
  margin-top: 15px;
`;

const FacebookLogin = styled.div`
  color: white;
  background-color: #4296f7;
  padding: 7px 16px;
  border-radius: 8px;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 20px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    margin-left: 10px;
    font-size: 14px;
    font-weight: 600;
  }
`;

const Info = styled(FatText)`
  font-size: 12px;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  text-align: center;
  margin-top: 10px;
`;

const SIGNUP_MUTATION = gql`
  mutation CreateAccount(
    $email: String!
    $name: String!
    $username: String!
    $password: String!
  ) {
    createAccount(
      email: $email
      name: $name
      username: $username
      password: $password
    ) {
      ok
      error
    }
  }
`;

function SignUp() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    errors,
    setError,
    formState,
    getValues,
    clearErrors,
  } = useForm({ mode: "onBlur" });

  const onCompleted = (data) => {
    const { username } = getValues();
    const {
      createAccount: { ok, error },
    } = data;

    if (!ok) {
      setError("result", { message: error });
    }
    history.push(routes.home, {
      message: "Sign up completed! Please log in to continue",
      username,
    });
  };

  const [signup, { loading }] = useMutation(SIGNUP_MUTATION, { onCompleted });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    const { email, name, username, password } = getValues();
    signup({ variables: { email, name, username, password } });
  };

  return (
    <AuthLayout>
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Description>
            Sign up to see photos and videos from your friends.
          </Description>
          <FacebookLogin>
            <FontAwesomeIcon
              icon={faFacebookSquare}
              style={{ fontSize: "20px" }}
            />
            <span>Log in with Facebook</span>
          </FacebookLogin>
        </HeaderContainer>
        <Separator customstyles="margin-bottom: -10px;" />
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({ required: "Email is required." })}
            name="email"
            type="text"
            placeholder="Email"
          />
          <Input
            ref={register({ required: "Full Name is required." })}
            name="name"
            type="text"
            placeholder="Full Name"
          />
          <Input
            ref={register({ required: "Username is required." })}
            name="username"
            type="text"
            placeholder="Username"
          />
          <Input
            ref={register({ required: "Password is required." })}
            name="password"
            type="password"
            placeholder="Password"
          />
          <Info>
            People who use our service may have uploaded your contact
            information to Instagram.
          </Info>
          <SubmitButton
            type="submit"
            value={loading ? "Signing Up..." : "Sign up"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
      <AppBox />
    </AuthLayout>
  );
}
export default SignUp;
