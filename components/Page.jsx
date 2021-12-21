import Header from './Header/Header';
import styled, { createGlobalStyle } from 'styled-components';

// import styles from './Page.module.scss';
const GlobalStyles = createGlobalStyle`
  /* latin */
  @font-face {
    font-family: 'Barlow Condensed';
    font-style: normal;
    font-weight: 300;
    src: url(https://fonts.gstatic.com/s/barlowcondensed/v5/HTxwL3I-JCGChYJ8VI-L6OO_au7B47rxz3bWuYMBYro.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'radnika_next';
    font-style: normal;
    font-weight: normal;
    src: url("/static/radnikanext-medium-webfont.woff2") format('woff2');
  }
  
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system,
    "radnika_next",
    "Helvetica",
    "Segoe UI",
    "Roboto",
     sans-serif;
     font-size: 62.5%;
     line-height: 2;
  }
  a {
    text-decoration: none;
    color: var(--black);
  }
  a:hover {
    text-decoration: underline;
    text-decoration-color: inherit;    
  }
  button {
    font-family: -apple-system,
    "radnika_next",
    "Helvetica",
    "Segoe UI",
    "Roboto",
    sans-serif;
  }
`;

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`;

const Page = (props) => {
  return (
    <div>
      <GlobalStyles />
      <div>
        <Header />
        <InnerStyles>
          {props.children}
        </InnerStyles>
      </div>
    </div>
  );
};
export default Page;
