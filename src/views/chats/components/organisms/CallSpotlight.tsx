import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {RTCStream} from '../atom';
import {COLOR} from 'constants/COLOR';
import {HScrollContainer} from 'components/containers/Scroll';
import {Column, Row} from 'components/layouts';
import {IsMe} from '../atom/IsMe';
import {Avatar} from 'components/atom';

type Props = {
  data: any;
  localStream: MediaStream | undefined;
  windowWidth: number;
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${COLOR.BLACK};
`;

const SpotlightWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: -50px;
`;

const NoSpotlightWrapper = styled(Row)`
  position: absolute;
  bottom: 120px;
  width: 100%;
  height: 150px;
  z-index: 19;
  justify-content: flex-end;

  @media (min-width: 1023px) {
    height: 90px;
  }
`;

const NoSpotlightItem = styled(Column)<{isMe: boolean}>`
  position: relative;
  width: 100px;
  height: 150px;
  margin-right: 10px;
  background: ${COLOR.BLACK};
  &:first-child {
    margin-left: 20px;
  }
  &:last-child {
    margin-right: 20px;
  }
  @media (min-width: 1023px) {
    width: 160px;
    height: 90px;
  }
  ${({isMe}) => {
    return isMe && IsMe;
  }}
`;

export default function CallSpotlight({data, localStream, windowWidth}: Props) {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const scrollItemWidth = windowWidth > 1023 ? 160 : 100;
    if ((scrollItemWidth + 10) * data.users.length + 30 > windowWidth) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  }, [data, windowWidth]);

  const renderNoSpotlightItems = () => {
    return data.users.map((user, i) => {
      let isMe = i === 0;
      return (
        <NoSpotlightItem isMe={isMe}>
          {i !== 0 ? (
            <RTCStream mediaStream={localStream} key={i} />
          ) : (
            <Avatar src={user.profile_image} size={57} key={i} />
          )}
        </NoSpotlightItem>
      );
    });
  };

  return (
    <Wrapper>
      <SpotlightWrapper>
        <RTCStream mediaStream={localStream} />
      </SpotlightWrapper>
      <NoSpotlightWrapper>
        {scroll ? (
          <HScrollContainer>{renderNoSpotlightItems()}</HScrollContainer>
        ) : (
          <>{renderNoSpotlightItems()}</>
        )}
      </NoSpotlightWrapper>
    </Wrapper>
  );
}
