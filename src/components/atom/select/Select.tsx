// import React from 'react';
import styled from 'styled-components';
import { COLOR } from 'constants/COLOR';

type OptionsProps = {
  id?: string;
  label: string;
  value: number | string;
};

type ContryOptionsProps = {
  countryNameEn?: string;
  countryNameLocal?: string;
  countryCode?: string;
  currencyCode?: string;
  currencyNameEn?: string;
  tinType?: string;
  tinName?: string;
  officialLanguageCode?: string;
  officialLanguageNameEn?: string;
  officialLanguageNameLocal?: string;
  countryCallingCode?: string;
  areaCodes?: any;
  region?: string;
  flag?: string;
};

type ContrySelectProps = {
  options: ContryOptionsProps[];
  width?: number;
  height?: number;
  margin?: number;
  padding?: number;
  iconName?: string;
  iconWidth?: number;
  iconHeight?: number;
  onChange?: (x: any) => void;
  value?: number | string;
};

type SelectProps = {
  options: OptionsProps[];
  width?: number;
  height?: number;
  margin?: number;
  padding?: number;
  iconName?: string;
  iconWidth?: number;
  iconHeight?: number;
  onChange?: (x: any) => void;
  className?: string;
  value?: number | string;
};

type ComponentProps = {
  width?: number;
  height?: number;
  margin?: number;
  padding?: number;
  iconName?: string;
  iconWidth?: number;
  iconHeight?: number;
};

const Component = styled.div<ComponentProps>`
  border-bottom: 1px solid ${COLOR.LIGHT_GRAY};
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ width }) => (width ? `width: ${width}px;` : 'width: 100%;')}
  ${({ height = 48 }) => `height: ${height}px;`}
	${({ padding = 6 }) => `padding: ${padding}px;`}
	${({ margin }) => `margin: ${margin}px;`}

  .select_icon_right {
    ${({ iconName }) => (iconName ? `background: url('/images/icon/${iconName}.png') center/cover no-repeat;` : '')}
    ${({ iconWidth = 16 }) => `width: ${iconWidth}px;`}
   ${({ iconHeight = 16 }) => `height: ${iconHeight}px;`}
  }
  .select_icon_left {
    background: url('/images/icon/ic-down-14.png') 50% 50% / cover no-repeat;
    width: 14px;
    height: 14px;
  }

  &:focus-visible {
    outline: none;
    border-color: ${COLOR.BLACK};
  }

  select {
    appearance: none;
    outline: none;
    color: ${COLOR.BLACK};
    font-size: 14px;
    height: 50px;
    padding: 0 6px;
    width: 100%;
    ${({ height = 46 }) => `height: ${height - 2}px;`}
    text-overflow: ellipsis;
  }
`;

export const Select = ({ options, onChange, value, ...props }: SelectProps) => {
  return (
    <Component {...props}>
      {props.iconName && <span className="select_icon_right"></span>}
      <select onChange={onChange} value={value}>
        {options.map(({ id, value, label }) => (
          <option key={id} value={value}>
            {label}
          </option>
        ))}
      </select>
      <span className="select_icon_left"></span>
    </Component>
  );
};

export const ContrySelect = ({ options, onChange, ...props }: ContrySelectProps) => {
  return (
    <Component {...props}>
      {props.iconName && <span className="select_icon_right"></span>}
      <select onChange={onChange}>
        {options.map(({ countryCode, countryCallingCode, countryNameEn, flag }) => (
          <option value={countryCallingCode} selected={countryCallingCode === '82' ? true : false}>
            {`${countryCode} ${flag} ${countryNameEn}  +${countryCallingCode}`}
          </option>
        ))}
      </select>
      <span className="select_icon_left"></span>
    </Component>
  );
};
