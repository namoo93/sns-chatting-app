import styled from 'styled-components';
import HorizontalScroll from 'react-scroll-horizontal';

interface StyleProps {
  scrollHeight: number;
}

export const YScrollContainer = styled.div<StyleProps>`
  height: ${({scrollHeight}) => `calc(100vh - ${scrollHeight}px);`};
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const HScrollContainer = ({children}) => {
  return (
    /**@ts-ignore */
    <HorizontalScroll
      pageLock={true}
      reverseScroll={true}

      //config        = {{ stiffness: int, damping: int }}
      //className     = { string }
      //animValues    = { int }
    >
      {children}
    </HorizontalScroll>
  );
};
