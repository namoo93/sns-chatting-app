import React from 'react';
import styled, {css} from 'styled-components';
import {COLOR} from 'constants/COLOR';

type TextProps = {
  children?: React.ReactNode;
  variant?: string;
};

const Component = styled.span<TextProps>`
  /* ${({variant}) =>
    variant === 'inputText_M' &&
    css`
      font-size: 16px;
      color: ${COLOR.GRAY};
    `}
  ${({variant}) =>
    variant === 'inputText_S' &&
    css`
      font-size: 14px;
      color: ${COLOR.GRAY};
    `} */

  ${({variant}) =>
    variant === 'caption_M' &&
    css`
      font-size: 14px;
      color: #999;
    `}
  ${({variant}) =>
    variant === 'caption_S' &&
    css`
      font-size: 13px;
      color: #999;
    `}
  ${({variant}) =>
    variant === 'caption_S_red' &&
    css`
      font-size: 13px;
      color: ${COLOR.RED};
    `}
  ${({variant}) =>
    variant === 'smallText_M' &&
    css`
      font-size: 13px;
      color: ${COLOR.GRAY};
    `}    
    ${({variant}) =>
    variant === 'smallText_S' &&
    css`
      font-size: 12px;
      color: #999;
    `}
`;

export const Text: React.FC<TextProps> = ({children, variant, ...props}) => {
  return (
    <Component variant={variant} {...props}>
      {children}
    </Component>
  );
};
