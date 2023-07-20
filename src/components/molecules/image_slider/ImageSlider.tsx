import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Row } from 'components/layouts';
import { getCenter } from 'lib/getStyle';
import { ReactComponent as Prev } from 'assets/chats/btn_prev.svg';
import { ReactComponent as Next } from 'assets/chats/btn_next.svg';
import { IconTypeButton } from 'components/atom';
import { HScrollContainer } from 'components/containers/Scroll';
import { COLOR } from 'constants/COLOR';

type Props = {
  images: any[];
};

const Wrapper = styled(Row)`
  width: 100%;
  height: 100%;
  align-content: center;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  ${getCenter({ v: true, h: true })}
`;

const TumbnailWrapper = styled(Row)`
  height: 60px;
  ${getCenter({ h: true })};
  bottom: 10px;
`;

const ScrollWrapper = styled(TumbnailWrapper)`
  height: 60px;
  position: absolute;
  width: 100%;
  bottom: 10px;
  padding: 0 20px;
`;
const TumbnailImageWrapper = styled.div<{ active?: boolean }>`
  width: 36px;
  height: 60px;
  background: ${COLOR.BLACK};
  margin-right: 10px;
  position: relative;
  border: ${({ active }) => active && `2px solid ${COLOR.PRIMARY}`};
`;

const TumbnailImage = styled.img`
  ${getCenter({ v: true, h: true })};
`;

const CurrentWrapper = styled.div`
  ${getCenter({ h: true })};
  background: rgba(38, 37, 37, 0.8);
  color: #fff;
  bottom: 80px;
  font-size: 11px;
  padding: 0 9px;
  line-height: 20px;
  border-radius: 8px;
  > span {
    color: #bbb;
  }
`;

const ArrowButton = styled(IconTypeButton)<{ disabled?: boolean }>`
  ${getCenter({ v: true })}
  display:${({ disabled }) => disabled && 'none'};
  z-index: 99;
`;
const PrevButton = styled(ArrowButton)`
  left: 10px;
`;
const NextButton = styled(ArrowButton)`
  right: 10px;
`;

export function ImageSlider({ images }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    if (46 * images.length > document.body.offsetWidth) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  }, [images]);

  const renderThumbnailWrapper = () => {
    return images.map((image, i) => {
      return (
        <TumbnailImageWrapper key={i} active={activeIndex === i} onClick={() => setActiveIndex(i)}>
          <TumbnailImage src={image.src} />
        </TumbnailImageWrapper>
      );
    });
  };
  return (
    <Wrapper>
      <PrevButton
        size={52}
        disabled={activeIndex === 0}
        onClick={() => {
          setActiveIndex(activeIndex - 1);
        }}
      >
        <Prev />
      </PrevButton>

      <Image src={images[activeIndex].src} />
      <CurrentWrapper>
        {activeIndex + 1} <span>of</span> {images.length}
      </CurrentWrapper>
      {scroll ? (
        <ScrollWrapper>
          <HScrollContainer>{renderThumbnailWrapper()}</HScrollContainer>
        </ScrollWrapper>
      ) : (
        <TumbnailWrapper>{renderThumbnailWrapper()}</TumbnailWrapper>
      )}

      <NextButton
        size={52}
        disabled={images.length - 1 === activeIndex}
        onClick={() => {
          setActiveIndex(activeIndex + 1);
        }}
      >
        <Next />
      </NextButton>
    </Wrapper>
  );
}
