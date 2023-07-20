// import React from 'react';
import styled from 'styled-components';
import {RADIUS} from 'constants/RADIUS';
import {
  ButtonVariant,
  ButtonTheme,
  ButtonVariantProperty,
} from 'components/atom/button';

type IconButtonProps = {
  children?: React.ReactNode;
  variant?: ButtonVariantProperty;
  type?: 'submit' | 'button';
  padding?: number;
  onMouseLeave?: () => void;
  onMouseEnter?: () => void;
  onClick?: () => void;
  className?: string;
  marginRight?: number;
  marginLeft?: number;
  iconName?: string;
  iconType?: string;
  fontSize?: number;
  fontWeight?: number;
  textMarginLeft?: number;
  fullWidth?: boolean;
  width?: number;
  height?: number;
  iconWidth?: number;
  iconHeight?: number;
  borderRadius?: boolean;
  borderRadiusRound?: boolean;
  blacklined?: boolean;
  grayText?: boolean;
  redText?: boolean;
  deepGrayText?: boolean;
  white?: boolean;
  iconOnly?: boolean;
  backgroundColor?: string;
};

type ComponentProps = {
  padding?: number;
  onClick?: () => void;
  marginRight?: number;
  marginLeft?: number;
  iconName?: string;
  iconType?: string;
  fontSize?: number;
  fontWeight?: number;
  textMarginLeft?: number;
  fullWidth?: boolean;
  width?: number;
  height?: number;
  iconWidth?: number;
  iconHeight?: number;
  borderRadius?: boolean;
  borderRadiusRound?: boolean;
  blacklined?: boolean;
  grayText?: boolean;
  redText?: boolean;
  deepGrayText?: boolean;
  variant?: ButtonVariantProperty;
  white?: boolean;
  iconOnly?: boolean;
  backgroundColor?: string;
};

const Component = styled.button<ComponentProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({marginRight}) => marginRight || 0}px;
  margin-left: ${({marginLeft}) => marginLeft || 0}px;
  padding: ${({padding}) => padding || 0}px;
  ${({width}) => width && `width: ${width}px;`}
  ${({height}) => height && `height: ${height}px;`}
  ${({fullWidth}) => (fullWidth ? 'width: 100%;' : '')}
  ${({borderRadius}) => (borderRadius ? `border-radius: ${RADIUS.MD}px;` : '')}
  ${({borderRadiusRound, height}) =>
    borderRadiusRound ? `border-radius: ${height}px;` : ''}

  font-size: ${({fontSize = 13}) => fontSize}px;

  ${({variant, blacklined, grayText, redText, deepGrayText, iconOnly}) => {
    const theme = ButtonTheme[variant || ButtonVariant.Default];
    return (
      !iconOnly &&
      `
      ${theme.default};
      ${blacklined ? `${theme.blacklined}` : ''};
      ${grayText ? `${theme.grayText}` : ''};
      ${redText ? `${theme.redText}` : ''};
      ${deepGrayText ? `${theme.deepGrayText}` : ''};
        `
    );
  }}
  ${({backgroundColor}) =>
    backgroundColor && `background-color: ${backgroundColor};`}
  .button_icon {
    ${({iconName, iconType = 'png'}) =>
      iconName
        ? `background: url('/images/icon/${iconName}.${iconType}') center/cover no-repeat;`
        : ''}
    ${({iconWidth = 22}) => (iconWidth ? `width: ${iconWidth}px;` : '')}
   ${({iconHeight = 22}) => (iconHeight ? `height: ${iconHeight}px;` : '')}
  }
  .button_text {
    font-weight: ${({fontWeight}) => fontWeight};
    margin-left: ${({textMarginLeft}) => textMarginLeft || 0}px;
  }
`;
export const IconButton = ({
  onClick,
  children,
  variant,
  marginRight,
  marginLeft,
  iconName,
  iconType,
  fontSize,
  fontWeight,
  textMarginLeft,
  fullWidth,
  width,
  height,
  iconWidth,
  iconHeight,
  borderRadius,
  borderRadiusRound,
  blacklined,
  grayText,
  redText,
  deepGrayText,
  white,
  iconOnly,
  backgroundColor,
  onMouseEnter,
  onMouseLeave,
  ...props
}: IconButtonProps) => {
  return (
    <Component
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      iconName={iconName}
      iconType={iconType}
      onClick={onClick}
      variant={variant}
      marginRight={marginRight}
      textMarginLeft={textMarginLeft}
      fontSize={fontSize}
      fontWeight={fontWeight}
      marginLeft={marginLeft}
      fullWidth={fullWidth}
      width={width}
      height={height}
      iconWidth={iconWidth}
      iconHeight={iconHeight}
      borderRadius={borderRadius}
      borderRadiusRound={borderRadiusRound}
      blacklined={blacklined}
      grayText={grayText}
      redText={redText}
      deepGrayText={deepGrayText}
      white={white}
      iconOnly={iconOnly}
      backgroundColor={backgroundColor}
      {...props}>
      <span className="button_icon"></span>
      {!iconOnly && <span className="button_text">{children}</span>}
    </Component>
  );
};
