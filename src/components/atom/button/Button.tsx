import React from 'react';
import styled from 'styled-components';
import { COLOR } from 'constants/COLOR';
import { RADIUS } from 'constants/RADIUS';

export const ButtonVariant = Object.freeze({
  Default: 'default',
  Gray: 'gray',
  White: 'white',
  Outlined: 'outlined',
  Text: 'text',
  Inactive: 'inactive',
  Active: 'active',
  Blacklined: 'blacklined',
  GrayText: 'grayText',
  RedText: 'redText',
  DeepGrayText: 'deepGrayText',
} as const);

export type ButtonVariantProperty =
  | 'default'
  | 'gray'
  | 'white'
  | 'outlined'
  | 'text'
  | 'inactive'
  | 'active'
  | 'blacklined'
  | 'grayText'
  | 'redText'
  | 'deepGrayText';

export const ButtonTheme = {
  [ButtonVariant.Default]: {
    default: `
					color : #fff;
					background: ${COLOR.PRIMARY};
					font-weight: bold; 
			`,
    active: `
					background: ${COLOR.SECONDARY} ;
			`,
    inactive: `
					color : ${COLOR.POINT_GRAY};
					background: ${COLOR.LIGHT_GRAY} ;
			`,
  },
  [ButtonVariant.Gray]: {
    default: `
					color : #fff;
					background: ${COLOR.GRAY};
					font-weight: bold; 
			`,
    active: `
					background: ${COLOR.POINT_GRAY} ;
			`,
    inactive: `
					color : ${COLOR.POINT_GRAY};
					background: ${COLOR.LIGHT_GRAY} ;
			`,
  },
  [ButtonVariant.Outlined]: {
    default: `
					color : #999;
					border : 1px solid ${COLOR.GRAY};
			`,
    blacklined: `
					color : ${COLOR.BLACK} ;
					border : 1px solid ${COLOR.BLACK} ;
			`,
  },
  [ButtonVariant.Text]: {
    default: `
				color : ${COLOR.PRIMARY};
				text-align : center;
		`,
    grayText: `
				color: ${COLOR.GRAY} ;
		`,
    redText: `
				color: ${COLOR.RED} ;
		`,
    deepGrayText: `
				color: #bcb3c5 ;
		`,
  },
  [ButtonVariant.White]: {
    default: `
				color : ${COLOR.BLACK};
				background: #fff;
				box-shadow: 0 0 10px rgb(9 9 9 / 10%);
		`,
  },
};

type ComponentProps = {
  onClick?: (() => void) | ((event: React.MouseEvent<HTMLButtonElement>) => void);
  borderRadius?: boolean;
  inactive?: boolean;
  fullWidth?: boolean;
  fontSize?: number;
  width?: number;
  height?: number;
  marginRight?: number;
  marginLeft?: number;
  margin?: string | number;
  padding?: number;
  type?: 'submit' | 'button';
  variant?: ButtonVariantProperty;
  className?: string;
  fontWeight?: number;
  children?: React.ReactNode;
  active?: boolean;
  blacklined?: boolean;
  grayText?: boolean;
  redText?: boolean;
  deepGrayText?: boolean;
  white?: boolean;
};

const Component = styled.button<ComponentProps>`
  display: flex;
  align-items: center;
  vertical-align: middle;
  justify-content: center;
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ fontSize = 13 }) => fontSize}px;
  ${({ margin }) => (margin ? `margin: ${margin};` : '')}
  ${({ width }) => (width ? `width: ${width}px;` : '')}

  ${({ marginRight }) => (marginRight ? `margin-right: ${marginRight}px;` : '')}
  ${({ marginLeft }) => (marginLeft ? `margin-left: ${marginLeft}px;` : '')}

  ${({ height = 70 }) => `height: ${height}px;`}
			${({ fullWidth }) => (fullWidth ? 'width: 100%;' : '')}
			${({ borderRadius }) => (borderRadius ? `border-radius: ${RADIUS.SM}px;` : '')}

			${({ variant, inactive, active, blacklined, grayText, redText, deepGrayText, white }) => {
    const theme = ButtonTheme[variant || ButtonVariant.Default];
    return `
					${theme.default};
					${inactive ? `pointer-events: none; ${theme.inactive}` : ''};
					${active ? `${theme.active}` : ''};
					${blacklined ? `${theme.blacklined}` : ''};
					${grayText ? `${theme.grayText}` : ''};
					${redText ? `${theme.redText}` : ''};
					${deepGrayText ? `${theme.deepGrayText}` : ''};
					${white ? `${theme.white}` : ''};
					`;
  }}
`;
export const Button: React.FC<ComponentProps> = ({
  onClick,
  borderRadius,
  inactive,
  fullWidth,
  width,
  height,
  fontSize,
  margin,
  marginLeft,
  marginRight,
  padding,
  variant = ButtonVariant.Default,
  className,
  type,
  fontWeight,
  children,
  active,
  blacklined,
  grayText,
  redText,
  deepGrayText,
  ...props
}) => {
  return (
    <Component
      margin={margin}
      marginLeft={marginLeft}
      marginRight={marginRight}
      padding={padding}
      borderRadius={borderRadius}
      inactive={inactive}
      fontSize={fontSize}
      fontWeight={fontWeight}
      fullWidth={fullWidth}
      width={width}
      height={height}
      variant={variant}
      active={active}
      blacklined={blacklined}
      grayText={grayText}
      redText={redText}
      deepGrayText={deepGrayText}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
};
