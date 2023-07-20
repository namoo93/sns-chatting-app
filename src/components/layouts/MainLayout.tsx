import React from 'react';
import styled from 'styled-components';

type Props = {
  children?: React.ReactNode;
  themeColor?: boolean;
  color?: string;
};

export default function MainLayout({
  children,
  themeColor = true,
  color = '#ffffff',
  ...props
}: Props) {
  return (
    <Component themeColor={themeColor} color={color} {...props}>
      {children}
    </Component>
  );
}

const Component = styled.div<{themeColor: boolean; color: string}>`
  height: 100vh;
`;
