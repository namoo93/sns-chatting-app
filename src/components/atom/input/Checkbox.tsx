// import React from 'react';
import { COLOR } from 'constants/COLOR';
import styled from 'styled-components';

type CheckboxProps = {
  defaultChecked?: boolean;
  id: string;
  name?: string;
  value: any;
  onClick?: (value: string) => void;
  onChange?: (e: any) => void;
  checked?: boolean;
  marginRight?: number;
  marginLeft?: number;
  checkRound?: boolean;
  label?: string;
  lineHeight?: number;
  fontSize?: number;
  textMarginLeft?: number;
  fullWidth?: boolean;
  iconWidth?: number;
  iconHeight?: number;
  disabled?: boolean;
};
type ComponentProps = {
  marginRight?: number;
  marginLeft?: number;
  checkRound?: boolean;
  lineHeight?: number;
  fontSize?: number;
  textMarginLeft?: number;
  fullWidth?: boolean;
  iconWidth?: number;
  iconHeight?: number;
  disabled?: boolean;
};

const Component = styled.span<ComponentProps>`
  ${({ fullWidth }) => fullWidth && `display: block;`}
  margin-right: ${({ marginRight }) => marginRight || 0}px;
  margin-left: ${({ marginLeft }) => marginLeft || 0}px;

  label {
    position: relative;

    input[type='checkbox'] {
      transform: translateY(3px);
      appearance: none;
      ${({ checkRound }) =>
        checkRound
          ? `background: url('/images/icon/input/check-round-off-22.png') center/cover no-repeat;`
          : `background: url('/images/icon/input/check-off-22.png') center/cover no-repeat;`}
      cursor: pointer;
      ${({ iconWidth = 22 }) =>
        iconWidth ? `width: ${iconWidth}px;transform: translateY(4.5px);` : ''}
      ${({ iconHeight = 22 }) =>
        iconHeight
          ? `height: ${iconHeight}px;transform: translateY(4.5px);`
          : ''}
			 ${({ disabled }) => (disabled ? `background: #ddd;border-radius: 4px;` : '')}
			 ${({ disabled, checkRound }) =>
        disabled && checkRound
          ? `background: #ddd !important;border-radius: 50%;`
          : ''}
			
			outline: none;

      &:checked {
        ${({ checkRound }) =>
          checkRound
            ? `background: url('/images/icon/input/check-round-on-22.png') center/cover no-repeat;`
            : `background: url('/images/icon/input/check-on-22.png') center/cover no-repeat;`}
      }
    }
    .label {
      font-size: ${({ fontSize }) => fontSize || 13}px;
      line-height: ${({ lineHeight }) => lineHeight + `px` || `normal`};
      margin-left: ${({ textMarginLeft }) => textMarginLeft || 25}px;
      word-break: keep-all;
      ${({ disabled }) =>
        disabled ? `color: #ddd;` : `color: ${COLOR.BLACK};`}

      &:checked {
        ${({ checkRound }) =>
          checkRound
            ? `background: url('/images/icon/input/check-round-on-22.png') center/cover no-repeat;`
            : `background: url('/images/icon/input/check-on-22.png') center/cover no-repeat;`}
      }
    }
    .label {
      font-size: ${({ fontSize }) => fontSize || 13}px;
      line-height: ${({ lineHeight }) => lineHeight + `px` || `normal`};
      margin-left: ${({ textMarginLeft }) => textMarginLeft || 25}px;
      word-break: keep-all;

      a {
        text-decoration: underline;
        color: ${COLOR.PRIMARY};
      }
    }
  }
`;
export const Checkbox = ({
  defaultChecked,
  id,
  name,
  value,
  checked,
  onClick,
  onChange,
  marginRight,
  marginLeft,
  checkRound,
  label,
  lineHeight,
  fontSize,
  textMarginLeft,
  fullWidth,
  iconWidth,
  iconHeight,
  disabled,
  ...props
}: CheckboxProps) => {
  return (
    <Component
      checkRound={checkRound}
      marginRight={marginRight}
      textMarginLeft={textMarginLeft}
      fontSize={fontSize}
      lineHeight={lineHeight}
      marginLeft={marginLeft}
      fullWidth={fullWidth}
      iconWidth={iconWidth}
      iconHeight={iconHeight}
      disabled={disabled}
      onClick={() => onClick && onClick(value)}
      {...props}>
      <label htmlFor={id}>
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          name={name}
          id={id}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
        {label && <span className="label">{label}</span>}
      </label>
    </Component>
  );
};
