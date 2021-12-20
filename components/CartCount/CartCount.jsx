import React from 'react';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const CartCount = ({ count }) => {
  const DotStyles = styled.div`
    background: var(--red);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    border-radius: 50%;
    height: 35px;
    width:35px;
    font-feature-settings: 'tnum';
    font-variant-numeric: tabular-nums;
  `;

  const AnimationStyles = styled.div`
    position: relative;

    .count {
      display: block;
      position: relative;
      transition: transform 0.4s;
      backface-visibility: hidden;
    }

    .count-enter {
      transform: scale(4) rotateX(0.5turn);
    }
    .count-enter-exit {
      background: lightblue;
    }

    .count-enter-active {
      transform: rotateX(0);
    }

    .count-exit {
      top: 0;
      position: absolute;
      transform: rotateX(0);
    }

    .count-exit-active {
      transform: scale(4) rotateX(0.5turn);
    }
    
  `;

  return (
    <AnimationStyles>
      <TransitionGroup>
        <CSSTransition
          unmountOnExit
          classNames="count"
          className="count"
          key={count}
          timeout={{ enter: 3000, exit: 3000 }}
        >

          <DotStyles>
            {count}
          </DotStyles>


        </CSSTransition>
      </TransitionGroup>
    </AnimationStyles>
  );
};

export default CartCount;
