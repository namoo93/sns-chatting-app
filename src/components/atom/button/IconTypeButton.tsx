import styled from 'styled-components';

type SvgButtonProps = {
  iconSrc?: string;
  iconType?: string;

  children?: React.ReactNode;
  icSize?: number;
  size?: number;
  onClick?: () => void;
  withCancel?: boolean;
};

const Component = styled.button<Partial<SvgButtonProps>>`
  align-items: center;
  display: flex;
  justify-content: center;
  ${({ size = 22 }) =>
    size
      ? `height: ${size}px; width: ${size}px;`
      : 'height: 100%; width: 100%;'}

  .button_icon {
    ${({ icSize = 22 }) =>
      icSize
        ? `height: ${icSize}px; width: ${icSize}px;`
        : 'height: 100%; width: 100%;'}
    width: 100%;
  }
`;

export const IconTypeButton = ({
  children,
  iconSrc,
  iconType,
  size,
  onClick,
  withCancel,
  ...props
}: SvgButtonProps) => {
  return (
    <Component
      iconSrc={iconSrc}
      iconType={iconType}
      size={size}
      onClick={onClick}
      withCancel={withCancel}
      {...props}>
      {children ? (
        children
      ) : (
        <img
          alt=""
          className="button_icon"
          src={`/images/${iconSrc}.${iconType}`}
        />
      )}
    </Component>
  );
};
