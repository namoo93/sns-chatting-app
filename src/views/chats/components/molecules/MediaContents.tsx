import React from 'react';
import styled from 'styled-components';
import { Row } from 'components/layouts';
import { MediaImageNav, MediaVideoNav } from 'components/molecules';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const ContentWrapper = styled(Row)`
  gap: 3px;
`;

const Timestamp = styled.p`
  color: #bbb;

  font-size: 13px;
  font-weight: 500;
  margin-bottom: 10px;
`;

export default function MediaContents({ timestamp, medias }: any) {
  return (
    <Wrapper>
      <Timestamp>{timestamp}</Timestamp>
      <ContentWrapper>
        {medias.map((media, i) => {
          if (media.type === 'image') {
            return (
              <MediaImageNav
                key={i}
                width={118}
                height={118}
                multiple={media.contents.length > 1}
                backgroundImage={media.contents[0].src}
              />
            );
          } else {
            return <MediaVideoNav key={i} width={118} height={118} src={media.contents[0].src} />;
          }
        })}
      </ContentWrapper>
    </Wrapper>
  );
}
