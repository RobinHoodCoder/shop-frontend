import styled, { keyframes } from 'styled-components';

const glow = keyframes`
  from {
    box-shadow: 0 0 0px #4ca34d;
  }

  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`;

const StyledSearchContainer = styled.div`
  position: relative;
  margin: 1rem 2rem;

  &[aria-busy='true'] {

  }
  input {
    width: 100%;
    padding: 10px;
    font-size: 2rem;

    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`;

const DropDownItem = styled.div`
  //border-bottom: 1px solid var(--lightGray);
  background: ${props => (props.highlighted ? '#f7f7f7' : 'white')};
  padding: 1rem;
  transition: transform 0.2s ease-in;
  ${props => (props.highlighted ? 'transform: translate3d(1rem,0,0)' : null)};
  display: flex;
  align-items: center;

  img {
    margin-right: 10px;
  }
`;


const ResultBox = styled.div`
  z-index: 2;
  position: relative;
  background: var(--black);
  overflow: hidden;
  border-bottom: 1px solid var(--lightGray);
  border-right: 1px solid var(--lightGray);
  border-left: 1px solid var(--lightGray);
  border-bottom-left-radius: .5rem;
  border-bottom-right-radius: .5rem;
  transition: all .3s ease-in;
  opacity: ${props => (props.isOpen ? '1' : '0')};
  pointer-events: ${props => (props.isOpen ? null : 'none')};
`;

export { StyledSearchContainer, DropDownItem, ResultBox };
