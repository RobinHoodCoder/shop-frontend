import styled from 'styled-components';

const LinkBlock = styled.a`
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  span {
    transition: all .1s ease-in;
  }
  &:hover {
   span {
     text-decoration: underline;
     text-decoration-color: inherit;
     transform: skew(-9deg) scale(1.05);
   }
  }
`;

export default LinkBlock;
