import { COLOR } from 'constants/COLOR';
import styled, { css } from 'styled-components';

type StyleProps = {
  hDirection: 'right' | 'left';
  x: number;
  y: number;
  width: number;
  visible: boolean;
};
type Props = {
  text: string;
};

export function Tooltip({
  x,
  y,
  text,
  width,
  hDirection,
  visible,
}: Props & StyleProps) {
  return (
    <Wrapper
      x={x}
      y={y}
      hDirection={hDirection}
      width={width}
      visible={visible}>
      <Triangle src={'/images/common/triangle.svg'} />
      {text}
    </Wrapper>
  );
}

const Triangle = styled.img`
  position: absolute;
  top: -10px;
  right: 10px;
  transform: rotate(-180deg);
`;

const Wrapper = styled.div<StyleProps>`
  background-color: ${COLOR.PRIMARY};
  color: #fff;

  font-size: 12px;
  font-weight: 500;
  line-height: 30px;
  border-radius: 15px;
  text-align: center;
  z-index: 99;
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.14);

  display: ${({ visible }) => (visible ? 'block' : 'none')};
  width: ${({ width }) => width}px;

  position: absolute;
  top: ${({ y }) => y}px;
  ${({ hDirection, x }) => {
    if (hDirection === 'right') {
      return css`
        right: ${x}px;
      `;
    } else {
      return css`
        left: ${x}px;
      `;
    }
  }}
`;
