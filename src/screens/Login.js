import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
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
import React from "react";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { userLogin } from "../apollo";
import { useLocation } from "react-router-dom";
//import PageTitle from "../components/PageTitle";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-size: 14px;
    font-weight: 600;
  }
  a {
    display: block;
    text-align: center;
    margin-top: 12px;
  }
  a span {
    font-size: 12px;
    color: #00376b;
  }
`;

const Notification = styled.div`
  color: #28a745;
  text-align: center;
  margin-top: 8px;
`;

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

function Login() {
  const location = useLocation();

  console.log(location.state);
  const {
    register,
    handleSubmit,
    errors,
    setError,
    formState,
    getValues,
    clearErrors,
  } = useForm({
    mode: "onBlur",
    defaultValues: { username: location?.state?.username || "" },
  });

  const clearLoginFormError = () => {
    clearErrors("result");
  };

  const onCompleted = (data) => {
    // console.log(data);
    const {
      login: { ok, token, error },
    } = data;

    if (!ok) {
      setError("result", { message: error });
    }

    if (token) {
      userLogin(token);
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, { onCompleted });

  const onSubmitValid = (data) => {
    // console.log(errors);
    if (loading) {
      return;
    }
    const { username, password } = getValues(); //data;
    login({
      variables: { username, password },
    });
  };

  // const onSubmitInvalid = (data) => {
  //   console.log(errors);
  // };

  return (
    <AuthLayout>
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            name="username"
            type="text"
            placeholder="Email, Username"
            ref={register({
              required: "Email/Username is required.",
              minLength: {
                value: 6,
                message: "Username must be at least 6 characters long.",
              },
            })}
            hasError={Boolean(errors?.username?.message)}
            onChange={clearLoginFormError}
          />
          <FormError message={errors?.username?.message} />
          <Input
            ref={register({
              required: "Password is required.",
              minLength: {
                value: 4,
                message: "Password must be at least 8 characters long.",
              },
            })}
            name="password"
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
            onChange={clearLoginFormError}
          />
          <FormError message={errors?.password?.message} />
          <Notification>{location?.state?.message}</Notification>
          <SubmitButton
            type="submit"
            value={loading ? "Logging In..." : "Log in"}
            disabled={!formState.isValid || loading}
          />
        </form>
        <Separator customstyles="margin: 20px 0px 30px 0px;" />
        <FacebookLogin>
          <FontAwesomeIcon
            icon={faFacebookSquare}
            style={{ fontSize: "25px" }}
          />
          <span>Log in with Facebook</span>
          <br />
          <FormError message={errors.result?.message} />
          <a href="/">
            <span>Forgot password?</span>
          </a>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        link={routes.signUp}
        linkText="Sign up"
      />
      <AppBox />
    </AuthLayout>
  );
}

export default Login;
