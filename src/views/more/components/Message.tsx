import styled from 'styled-components';

import {Bookmark, IconTypeButton} from 'components/atom';
import {Avatar} from 'components/atom/images';
import {Row} from 'components/layouts';
import {SenderInfo} from 'views/more/components/SenderInfo';

const Container = styled.div`
  margin-bottom: 30px;
  padding: 15px 0;
  width: 100%;
`;
const Content = styled.div`
  background: #f8f8f8;
  border-radius: 15px;
  color: #262525;
  cursor: pointer;
  font-size: 13px;
  margin-top: 15px;
  padding: 15px;
  width: 100%;
`;

export const Message = ({data, onClick}) => {
  return (
    <Container>
      <Row justify="space-between">
        <Row justify="flex-start">
          <Avatar size={40} src={data.avatar} />
          <SenderInfo name={data.name} date={data.date} />
        </Row>
        <Bookmark
          active={data.bookmarked}
          onClick={() => onClick(data.id, data.bookmarked)}
        />
      </Row>
      <Row>
        <Content
          onClick={() => {
            /* 해당 메세지 있는 채팅방으로 이동 */
          }}>
          {data.content}
        </Content>
        <IconTypeButton
          iconSrc="icon/ic-move"
          iconType="svg"
          onClick={() => {
            /* 해당 메세지 있는 채팅방으로 이동 */
          }}
        />
      </Row>
    </Container>
  );
};
