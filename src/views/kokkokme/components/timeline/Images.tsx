import { Icon } from 'components/atom';
import React, { useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import prevArrow from 'assets/prev_arrow.svg';
import nextArrow from 'assets/next_arrow.svg';

const Container = styled.div`
  overflow: hidden;
  border-radius: 10px;
  position: relative;

  .slider_imgs {
    object-fit: cover;
  }

  .slider_imgs_video {
    height: 100%;
    /* position: absolute;
    overflow: hidden; */
  }

  .slick-track {
  }
  .slick-slide {
  }

  .slick-list {
    background-color: #0000007c;
  }

  .custom_dots {
    position: absolute;
    bottom: 15px;
    display: inline-block;
    height: fit-content;
    background-color: #000;
    border-radius: 20px;
    font-size: 12px;
    color: #fff;
    line-height: 1;
    letter-spacing: 2px;
    opacity: 0.5;
    left: 50%;
    transform: translateX(-50%);
    padding: 6px 12px 5px;
    min-width: 48px;
    text-align: center;
  }

  &.margin_bottom10 {
    margin-bottom: 10px;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
`;

//arrow
const SampleNextArrowWrap = styled.div`
  position: absolute;
  right: 10px;
  width: 24px;
  height: 24px;

  &::before {
    content: '';
  }
`;
const SamplePrevArrowWrap = styled.div`
  position: absolute;
  left: 10px;
  width: 24px;
  height: 24px;

  &::before {
    content: '';
  }
`;
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <SampleNextArrowWrap className={className} style={{ ...style, display: 'block', zIndex: '999' }} onClick={onClick}>
      <Icon size={42} src={nextArrow} />
    </SampleNextArrowWrap>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <SamplePrevArrowWrap className={className} style={{ ...style, display: 'block', zIndex: '999' }} onClick={onClick}>
      <Icon size={42} src={prevArrow} />
    </SamplePrevArrowWrap>
  );
}

const Images = ({ image }) => {
  // const video = image?.filter((content) => content.includes('mp4'));
  // const images = image?.filter((content) => !content.includes('mp4'));
  const [index, setIndex] = useState(1);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: (i) => {
      setIndex(i + 1);
    },
  };
  return (
    <Container className={image?.length !== 0 ? `margin_bottom10` : ``}>
      <Slider {...settings}>
        {image?.map((url, idx) =>
          url.includes('mp4') ? (
            <div className="slider_imgs_video">
              <Video src={url} key={idx} controls muted autoPlay />
            </div>
          ) : (
            <img className="slider_imgs" src={url} key={idx} alt="" />
          ),
        )}
      </Slider>
      {image?.length === 1 && image?.length !== 0 ? (
        <></>
      ) : (
        <span className="custom_dots">
          {index}/{image?.length}
        </span>
      )}
    </Container>
  );
};

export default Images;
