// import React from 'react';
import { COLOR } from 'constants/COLOR';
import styled from 'styled-components';

type RadioProps = {
  defaultChecked?: boolean;
  id: string;
  label?: string;
  name: string;
  value: any;
  group?: string;
  onClick?: (value: string) => void;
  onChange?: (e: any) => void;
  checked?: boolean;
  marginRight?: number;
  marginLeft?: number;
  marginBottom?: number;
  lineHeight?: number;
  fontSize?: number;
  textMarginLeft?: number;
  smallRadio? : boolean;
  fullWidth? : boolean;
};
type ComponentProps = {
  marginRight?: number;
  marginBottom?: number;
  lineHeight?: number;
  fontSize?: number;
  textMarginLeft?: number;
  marginLeft?: number;
  smallRadio? : boolean;
  fullWidth? : boolean;
};
const Component = styled.span<ComponentProps>`
    ${({fullWidth}) => fullWidth && `display: block;` }
    margin-right: ${({ marginRight }) => marginRight || 0}px; 
    margin-left: ${({ marginLeft }) => marginLeft || 0}px;
    margin-bottom: ${({ marginBottom }) => marginBottom || 0}px;
    label {
        position: relative;

        input[type='radio'] {
            position: absolute;
            top: -3px;
            appearance: none;
            outline: none;
            ${({smallRadio}) => smallRadio ? ` 
                height: 18px;
                width: 100%;
                background: url('/images/icon/input/check-round-off-18.png') left/contain no-repeat;
                transform: translateY(5px);`
            : 
              ` 
                height: 22px;
                width: 100%;
                background: url('/images/icon/input/check-round-off-22.png') left/contain no-repeat;
                transform: translateY(2px);` 
            }
            cursor: pointer;

          &:checked {
              ${({smallRadio}) => smallRadio ? `background: url('/images/icon/input/check-round-on-18.png') left/contain no-repeat;`: `background: url('/images/icon/input/radio-on-22.png') left/contain no-repeat;` }
          }
        }
      .label {
          font-size: ${({fontSize}) => fontSize || 13}px;
          line-height: ${({lineHeight}) => lineHeight + `px` || `normal`};
          margin-left: ${({ textMarginLeft }) => textMarginLeft || 25}px;
          word-break: keep-all;
          color: ${COLOR.BLACK};
      }
    }
`;

export const Radio = ({
  defaultChecked,
  id,
  name,
  label,
  marginRight,
  marginLeft,
  marginBottom,
  textMarginLeft,
  value,
  onClick,
  onChange,
  checked,
  fontSize,
  lineHeight,
  smallRadio,
  fullWidth,
  ...props
}: RadioProps) => {
  return (
    <Component
      smallRadio={smallRadio}
      textMarginLeft={textMarginLeft}
      marginRight={marginRight}
      marginLeft={marginLeft}
      marginBottom={marginBottom}
      fontSize={fontSize}
      lineHeight={lineHeight}
      fullWidth={fullWidth}
      onClick={() => onClick && onClick(value)}
      {...props}>
      <label htmlFor={id}>
        <input
          defaultChecked={defaultChecked}
          name={name}
          id={id}
          type="radio"
          value={value}
          onChange={onChange}
          checked={checked}
        />
        {label && <span className="label">{label}</span>}
      </label>
    </Component>
  );
};
