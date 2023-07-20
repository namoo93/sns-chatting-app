import styled from 'styled-components';

export type IconProps = {
  size: number;
  src: string;
  id?: string;
  alt?: string;
  className?: string;
  title?: string;
  inline?: boolean;
  marginLeft?: number;
  marginRight?: number;
  mbSize?: number;
  onClick?: () => void;
};

type styleProps = {
  marginLeft?: number;
  marginRight?: number;
  mbSize?: number;
};

const Image = styled.img<styleProps>`
  flex-shrink: 0;
  object-fit: contain;
  ${({marginLeft, marginRight}) => `
    ${marginLeft ? `margin-left: ${marginLeft}px;` : ''}
    ${marginRight ? `margin-right: ${marginRight}px;` : ''}
  `}
`;
const InlineContainer = styled.div<styleProps>`
  display: inline-block;
  ${({marginLeft, marginRight}) => `
    ${marginLeft ? `margin-left: ${marginLeft}px;` : ''}
    ${marginRight ? `margin-right: ${marginRight}px;` : ''}
  `}
`;

export const Icon = ({
  size,
  src,
  title,
  inline,
  marginLeft,
  marginRight,
  alt = '',
  ...props
}: IconProps) => {
  return (
    <>
      {inline ? (
        <InlineContainer marginLeft={marginLeft} marginRight={marginRight}>
          <Image
            alt={alt}
            title={title}
            width={size}
            height={size}
            src={src}
            style={{
              marginLeft,
              marginRight,
            }}
            {...props}
          />
        </InlineContainer>
      ) : (
        <Image
          alt={alt}
          title={title}
          width={size}
          height={size}
          marginLeft={marginLeft}
          marginRight={marginRight}
          src={src}
          style={{
            marginLeft,
            marginRight,
          }}
          {...props}
        />
      )}
    </>
  );
};
