import React from 'react';
import styled, {css} from 'styled-components';
import {RTCStream} from '../atom';
import {COLOR} from 'constants/COLOR';
import {Column, Row} from 'components/layouts';
import {IsMe} from '../atom/IsMe';
import {Avatar} from 'components/atom';

type Props = {
  data: any;
  localStream: MediaStream | undefined;
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${COLOR.BLACK};
`;

const RemoteStreamWrapper = styled(Row)`
  width: 100%;
  height: calc(100% - 100px);
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  padding: 20px;
  gap: 6px;
`;

const LocalStreamWrapper = styled(Column)`
  position: absolute;
  width: 160px;
  height: 90px;
  bottom: 160px;
  right: 20px;
  ${IsMe}
`;

const TileItem = styled(Column)<{length: number; active?: boolean}>`
  position: relative;
  border: ${({active}) => active && `4px solid ${COLOR.PRIMARY}`};
  ${({length}) => {
    if (length === 1) {
      return css`
        width: 100%;
        height: 100%;
      `;
    }
    if (length === 2 || length === 3 || length === 4) {
      return css`
        width: calc(50% - 5px);
        height: 50%;
      `;
    }
    if (length > 4) {
      return css`
        width: calc(100% / 3 - 5px);
        height: 33.3%;
      `;
    }
  }};
`;

export default function CallTile({data, localStream}: Props) {
  return (
    <Wrapper>
      <RemoteStreamWrapper justify={'center'}>
        {data.users.map((user, i) => {
          return (
            <TileItem
              length={data.users.length}
              active={data.users.length !== 1 && i === 2}>
              {i === 3 ? (
                <Avatar src={user.profile_image} size={116} />
              ) : (
                <RTCStream mediaStream={localStream} />
              )}
            </TileItem>
          );
        })}
      </RemoteStreamWrapper>
      <LocalStreamWrapper>
        <RTCStream mediaStream={localStream} />
      </LocalStreamWrapper>
    </Wrapper>
  );
}
