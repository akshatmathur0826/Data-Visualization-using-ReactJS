import { createGlobalStyle } from "styled-components";

export const darkTheme = {
  body: "#fff",
  fontColor: "#000",
  selectcol:"black",
  svgcol:"black",
  selectfill:"white",
  border:"5px solid black",
  h3:"black"
};

export const lightTheme = {
  body: "#000",
  fontColor: "#fff",
  selectcol:"#b8860b",
  svgcol:"white",
  selectfill:"black",
  border:"5px solid #b8860b",
  h3:"#b8860b"
};

export const GlobalStyles = createGlobalStyle`
	body {
		background-color: ${(props) => props.theme.body};
	}
    select{
        background-color: ${(props) => props.theme.selectcol};
        color:${(props) => props.theme.selectfill};
    }
    svg{
        background-color: ${(props) => props.theme.body};
        color:${(props) => props.theme.svgcol};
        border:${(props) => props.theme.border};
    }
    h3{
        color:${(props) => props.theme.h3};
    }
`;