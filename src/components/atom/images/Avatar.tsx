import styled from 'styled-components';
import { Icon } from 'components/atom/images/Icon';

interface ImageProps {
  size: number;
  src?: string;
  onClick?: () => void;
}

const Image = styled.img<ImageProps>`
  border-radius: 50%;
  flex-shrink: 0;
  object-fit: contain;

  ${({ size }) => (size ? `height: ${size}px; width: ${size}px;` : `height: 100%; width: 100%;`)}
`;

export const Avatar = ({ size, src = '', onClick, ...props }: ImageProps) =>
  !src ? (
    <Icon size={size} src="/images/ic-profile.svg" onClick={() => onClick?.()} />
  ) : (
    <Image size={size} src={src} onClick={() => onClick?.()} {...props} />
  );
