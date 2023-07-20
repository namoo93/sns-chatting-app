import styled from 'styled-components';

type RowProps = {
  align?: string;
  fullWidth?: boolean;
  justify?: string;
  wrap?: string;
};

export const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: row;
  ${({align = 'center'}) => `
    align-items: ${align};
  `}
  ${({fullWidth}) => (fullWidth ? 'width: 100%;' : '')}
  ${({justify}) => (justify ? `justify-content: ${justify};` : '')}
  ${({wrap}) => (wrap ? 'flex-wrap: wrap;' : '')}
`;
