import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  skyBlue: "#67b5f8",
  blue: "rgb(0, 149, 246)",
  borderColor: "rgb(219, 219, 219)",
};

export const darkTheme = {
  fontColor: "white",
  bgColor: "#2c2c2c",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
      all:unset;
    }
    * {
      box-sizing:border-box;
    }
    body {
        background-color: #FAFAFA;
        font-size:14px;
        font-family:'Open Sans', sans-serif;
        color: rgb(38, 38, 38);
    }
    a {
      text-decoration: none;
      color: inherit;
    }
`;
