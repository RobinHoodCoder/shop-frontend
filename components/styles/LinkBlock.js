import styled from 'styled-components';

const LinkBlock = styled.a`
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  &:hover {
   span {
     text-decoration: underline;
     text-decoration-color: inherit;
   }
  }
`;

export default LinkBlock;
