import styled from 'styled-components';

import {Column} from "components/layouts";

const Container = styled(Column)`
  margin-left: 20px;
`;

const Name = styled.span`
  color: #262525;
  font-size: 15px;
  font-weight: 500;
`;
const Date = styled.span`
  color: #bbb;
  font-size: 11px;
`;

export const SenderInfo = ({name, date}) => {
  return (
    <Container align="flex-start">
      <Name>{name}</Name>
      <Date>{date}</Date>
    </Container>
  );
};
