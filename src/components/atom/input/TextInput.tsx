import styled, { css } from 'styled-components';
import { COLOR } from 'constants/COLOR';

type Props = {
  fontSize?: number;
  type?: string;
  tabIndex?: number;
  maxLength?: number;
  placeholder?: string;
  value?: string;
  id?: string;
  name?: string;
  error?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange?: (event: any) => void;
  marginBottom?: number;
  marginTop?: number;
  mbMarginBottom?: number;
  onFocus?: () => void;
  onBlur?: any;
  disabled?: boolean;
  autoFocus?: boolean;
  width?: number;
  padding?: number | string;
  onKeyUp?: any;
  valid?: boolean;
  borderNone?: boolean;
  withCancel?: boolean;
};

const Component = styled.input<Props>`
  ${({ width }) => (width ? `width: ${width}px;` : 'width: 100%;')}
  height: 48px;
  padding: 0 4px;
  ${({ padding = 6 }) => {
    if (typeof padding === 'number') {
      return css`
        padding: ${padding}px;
      `;
    } else {
      return css`
        padding: ${padding};
      `;
    }
  }}

  border-bottom: solid 1px ${COLOR.GRAY};
  ${({ error }) => (error ? `border-bottom: solid 1px #f00;` : `border-bottom: solid 1px ${COLOR.GRAY};`)}
  background: transparent;
  font-size: ${({ fontSize }) => fontSize || 14}px;
  line-height: 1.5;
  margin-bottom: ${({ marginBottom }) => marginBottom || 0}px;
  margin-top: ${({ marginTop }) => marginTop || 0}px;

  &:focus-visible {
    outline: none;
    border-color: ${({ valid }) => (valid ? COLOR.BLACK : COLOR.RED)};
  }

  &::placeholder {
    color: #dddddd;
  }
`;

export default function TextInput({
  fontSize,
  type,
  name,
  marginBottom,
  marginTop,
  mbMarginBottom,
  onFocus,
  onChange,
  onBlur,
  disabled,
  autoFocus,
  tabIndex,
  maxLength,
  onKeyUp,
  valid = true,
  borderNone,
  withCancel,
  ...props
}: Props) {
  return (
    <Component
      fontSize={fontSize}
      type={type ?? 'text'}
      name={name}
      marginBottom={marginBottom}
      marginTop={marginTop}
      mbMarginBottom={mbMarginBottom}
      {...props}
      onFocus={onFocus}
      onChange={onChange}
      onBlur={onBlur}
      autoFocus={autoFocus}
      disabled={disabled}
      tabIndex={tabIndex}
      maxLength={maxLength}
      onKeyUp={onKeyUp}
      valid={valid}
      borderNone={borderNone}
      withCancel={withCancel}
    />
  );
}
