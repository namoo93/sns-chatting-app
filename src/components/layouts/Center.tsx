import React from 'react';
import styled from 'styled-components';

interface CenterProps {
  children: React.ReactNode;
}

const Component = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

export const Center = ({children, ...props}: CenterProps) => (
  <Component {...props}>{children}</Component>
);
