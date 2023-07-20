import styled from 'styled-components';

import {Message} from 'views/more/components/Message';

interface MessagesProps {
  data: any;
  onClick: (id: number, bookmarked: boolean) => void;
}

const Container = styled.div`
  height: 100%;
  overflow: auto;
  padding-bottom: 20px;
  width: 100%;
  padding: 0 20px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Messages = ({data, onClick}: MessagesProps) => {
  return (
    <Container>
      {data.map(x => (
        <Message key={x.id} data={x} onClick={onClick} />
      ))}
    </Container>
  );
};
