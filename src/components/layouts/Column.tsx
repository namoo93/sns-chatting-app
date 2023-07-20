import styled from 'styled-components';

type ColumnProps = {
    fullWidth?: boolean;
    align?: string;
    justify?: string;
    wrap?: string;
};

export const Column = styled.div<ColumnProps>`
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => align || 'center'};
  justify-content: ${({ justify }) => justify || 'center'};
  ${({ wrap }) => (wrap ? 'flex-wrap: wrap;' : '')}
  ${({ fullWidth }) => (fullWidth ? 'width: 100%;' : '')}
`;