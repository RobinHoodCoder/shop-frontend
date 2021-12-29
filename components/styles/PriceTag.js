import styled from 'styled-components';

const PriceTag = styled.span`
  background: var(--red);
  transform: rotate(3deg);
  text-shadow: 2px 2px 0 rgb(0 0 0 / 10%);
  color: white;
  font-weight: 600;
  padding: 5px;
  line-height: 1;
  font-size: 3rem;
  display: inline-block;
  position: absolute;
  top: -3px;
  right: -3px;
`;

export default PriceTag;
