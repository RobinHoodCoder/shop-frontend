import styled from 'styled-components';
import Link from 'next/link';
import PropTypes from 'prop-types';

const LinkBlockStyles = styled.div`
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

const LinkBlock = ({ children, href }) => {
  return (
    <LinkBlockStyles>
      <Link href={href}>
        <div>
          {children}
        </div>
      </Link>
    </LinkBlockStyles>
  );
};

export default LinkBlock;
LinkBlock.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};
