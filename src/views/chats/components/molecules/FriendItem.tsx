import React from 'react';
import styled from 'styled-components';
import { Avatar, Checkbox, Heading5 } from 'components/atom';
import { COLOR } from 'constants/COLOR';
import { IContact } from 'modules/contacts/types';

type Props = IContact & {
  handleCheckedList: (id: any) => void;
  checked: boolean;
};

const Wrapper = styled.div<{ checked: boolean }>`
  height: 60px;
  display: flex;
  align-items: center;
  align-content: center;
  padding: 0 20px;
  background: ${({ checked }) => (checked ? '#fcf2e8' : 'transparent')};
`;

const TextContainer = styled.div`
  margin-left: 16px;
`;
const Description = styled.p`
  color: ${COLOR.TEXT_LIGHT_GRAY};
`;

export default function FriendItem({ friend, handleCheckedList, checked }: Props) {
  console.log(friend);
  const { id, first_name, last_name, profile_image, uid } = friend;
  return (
    <Wrapper checked={checked}>
      <Checkbox
        id={id.toString()}
        value={id}
        checkRound
        checked={checked}
        marginRight={16}
        onChange={() => handleCheckedList(id.toString())}
      />
      <Avatar size={40} src={profile_image} />
      <TextContainer>
        <Heading5>
          {first_name} {last_name}
        </Heading5>
        <Description>@{uid}</Description>
      </TextContainer>
    </Wrapper>
  );
}
