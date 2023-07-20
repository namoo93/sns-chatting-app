import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { ModalContext } from 'contexts';
import { postRemoveUser } from 'modules/chats/rooms/api';
import { Column, Row } from 'components/layouts';
import { Dropdown, Dialog } from 'components/molecules';
import { Avatar, Heading5, IconTypeButton } from 'components/atom';
import { ReactComponent as Kok } from 'assets/chats/ic_kok.svg';
import { ReactComponent as Owner } from 'assets/chats/ic_owner.svg';
import { ReactComponent as Block } from 'assets/chats/ic_block.svg';
import { ReactComponent as AddFriend } from 'assets/chats/ic_add_friend.svg';
import { getCenter } from 'lib/getStyle';
import { JoinedUser } from 'modules/chats/rooms/types';
import { useTranslation } from 'react-i18next';

type Props = JoinedUser & {
  admin_id?: number;
  isAdmin?: boolean;
  room_id: string;
};

const Wrapper = styled(Row)`
  position: relative;
  padding: 10px 20px;
`;

const DialogTitle = styled.span`
  font-weight: normal;
  > span {
    font-weight: bold;
  }
`;

const AvatarWrapper = styled.div<{ isNoFriend?: boolean; isBlock?: boolean }>`
  position: relative;
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #fff;
    background: rgba(0, 0, 0, 0.5);
    display: block;
  }
  ${({ isNoFriend, isBlock }) => {
    if (isNoFriend) {
      return css`
        &::after {
          text-align: center;
          line-height: 40px;
          content: '?';
        }
      `;
    }
    if (isBlock) {
      return css`
        &::after {
          content: '';
        }
        svg {
          z-index: 1;
          ${getCenter({ v: true, h: true })}
        }
      `;
    }
  }}
`;

const UserName = styled(Heading5)`
  svg {
    display: inline;
  }
`;

const InfoWrapper = styled(Column)`
  margin-left: 15px;
`;
const Tag = styled.p`
  font-size: 13px;
  color: #bcb3c5;
`;

const ButtonWrapper = styled(Column)`
  position: absolute;
  right: 20px;
`;

export default function RoomDetailMemberItem({
  uid,
  id,
  first_name,
  last_name,
  profileImage,
  admin_id,
  isAdmin,
  room_id,
}: Props) {
  const { t } = useTranslation();
  const { openModal, closeModal } = useContext(ModalContext);
  const queryClient = useQueryClient();
  const removeUserMutation = useMutation(postRemoveUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['getRoom', 'getRooms']);
      closeModal();
    },
    onError: (e: any) => {
      const message = e.data.message || '';
      console.warn(message);
    },
  });
  const isNoFriend = uid === '3';
  const isBlock = uid === '4';
  const menuList = [
    {
      label: `${t('chats.Remove')}`,
      onClick: () => {
        openModal(
          <Dialog
            title={() => {
              return (
                <DialogTitle>
                  {t('chats.Remove {username} from group?')}
                  <span>
                    {first_name} {last_name}
                  </span>
                </DialogTitle>
              );
            }}
            buttonText1={`${t('button-common.Cancel')}`}
            buttonText2={`${t('button-common.OK')}`}
            onClick={() => {
              admin_id &&
                removeUserMutation.mutate({
                  admin_id,
                  remove_user_id: id,
                  room_id,
                });
            }}
          />,
        );
      },
    },
    {
      label: `${t('button-common.Cancel')}`,
      onClick: () => {},
    },
  ];

  return (
    <Wrapper>
      {isNoFriend ? (
        <AvatarWrapper isNoFriend={isNoFriend}>
          <Avatar src={profileImage ? profileImage : ''} size={40} />
        </AvatarWrapper>
      ) : isBlock ? (
        <AvatarWrapper isBlock={isBlock}>
          <Block />
          <Avatar src={profileImage ? profileImage : ''} size={40} />
        </AvatarWrapper>
      ) : (
        <Avatar src={profileImage ? profileImage : ''} size={40} />
      )}
      <InfoWrapper align="start">
        <UserName>
          {first_name} {last_name} {id === admin_id && <Owner />}
        </UserName>
        <Tag>@{uid}</Tag>
      </InfoWrapper>
      <ButtonWrapper>
        {!isBlock &&
          (!isNoFriend ? (
            isAdmin && admin_id !== id ? (
              <Dropdown
                menuList={menuList}
                width={150}
                x={0}
                y={0}
                renderButton={() => (
                  <IconTypeButton size={24}>
                    <Kok />
                  </IconTypeButton>
                )}
              />
            ) : (
              <></>
            )
          ) : (
            <IconTypeButton size={32}>
              <AddFriend />
            </IconTypeButton>
          ))}
      </ButtonWrapper>
    </Wrapper>
  );
}
