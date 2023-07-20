import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Column, Row } from 'components/layouts';
import { ReactComponent as Album } from 'assets/chats/ic_album.svg';
import { ReactComponent as Delete } from 'assets/chats/ic_media_delete.svg';
import { ReactComponent as Editor } from 'assets/chats/ic_editor.svg';
import { ReactComponent as Download } from 'assets/chats/ic_download.svg';
import { ReactComponent as Share } from 'assets/chats/ic_share.svg';
import { IconTypeButton } from 'components/atom';
import { COLOR } from 'constants/COLOR';
import { getCenter } from 'lib/getStyle';
import { ImageSlider } from 'components/molecules';

const imagesDummy = {
  timestamp: 'Jan 3, 2022',
  sender: 'Boummaly Sayasone',
  type: 'image',
  contents: [
    {
      src: '/images/chats/image_ex.png',
    },
    {
      src: '/images/chats/profile_image_ex.png',
    },
    {
      src: '/images/chats/profile_image_ex2.png',
    },
    {
      src: '/images/chats/profile_image_ex3.png',
    },
  ],
};

const Wrapper = styled(Column)`
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;
const TopWrapper = styled(Row)`
  line-height: 30px;
  padding-left: 10px;
`;
const Sender = styled.p`
  color: ${COLOR.BLACK};

  font-size: 13px;
  font-weight: 500;
  margin-right: 10px;
`;
const Timestamp = styled.p`
  color: #bbb;

  font-size: 11px;
`;
const ButtonWrapper = styled(Row)`
  padding: 15px 20px;
  width: 100%;
  justify-content: space-between;
`;
const ButtonRightWrapper = styled(Row)`
  gap: 40px;
`;

const MediaWrapper = styled.div`
  background: #f8f8f8;

  position: relative;
  width: 100%;
  height: calc(100vh - 85px);
`;
const Video = styled.video`
  padding: 0 20px;
  max-width: 100%;
  max-height: 100%;
  ${getCenter({ v: true, h: true })}
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  ${getCenter({ v: true, h: true })}
`;

export default function MediaDetail() {
  const navigate = useNavigate();

  const dummy = imagesDummy;

  return (
    <Wrapper>
      <TopWrapper>
        <Sender>{dummy.sender}</Sender>
        <Timestamp>{dummy.timestamp}</Timestamp>
      </TopWrapper>
      <MediaWrapper>
        {dummy.type === 'video' ? (
          <Video src={dummy.contents[0]?.src || ''} controls />
        ) : dummy.contents.length === 1 ? (
          <Image src={dummy.contents[0]?.src || ''} />
        ) : (
          <ImageSlider images={dummy.contents} />
        )}
      </MediaWrapper>

      <ButtonWrapper>
        <IconTypeButton onClick={() => navigate('/chats/1/media')}>
          <Album />
        </IconTypeButton>
        <ButtonRightWrapper>
          <IconTypeButton>
            <Delete />
          </IconTypeButton>
          <IconTypeButton onClick={() => window.open(`/image-edit/1`, '', 'width=685,height=605')}>
            <Editor />
          </IconTypeButton>
          <IconTypeButton>
            <Download />
          </IconTypeButton>
          <IconTypeButton>
            <Share />
          </IconTypeButton>
        </ButtonRightWrapper>
      </ButtonWrapper>
    </Wrapper>
  );
}
