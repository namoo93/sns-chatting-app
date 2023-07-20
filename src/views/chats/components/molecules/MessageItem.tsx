import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as Heart } from 'assets/chats/ic_heart.svg';
import { ReactComponent as Reply } from 'assets/chats/ic_reply.svg';
import { ReactComponent as Tail } from 'assets/tail.svg';
import { Avatar, IconTypeButton } from 'components/atom';
import { Row } from 'components/layouts';
import { COLOR } from 'constants/COLOR';
import { CustomDropdown, CustomDropdownStyleProps } from 'components/molecules';
import { MessageEntity } from 'modules/chats/rooms/messages/types';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';

type Props = MessageEntity & {
  index: number;
  activeDropdown: boolean;
  setActiveDropdownIndex: (index) => void;
  isMain?: boolean;
  userId?: number;
  isEnd?: boolean;
  searchValue: string;
  scrollMessageId?: string;
  page: number;
};

const Wrapper = styled(Row)`
  position: relative;
  margin: 10px 0;
  width: 100%;
`;

const ContentWrapper = styled.div<{ isMe: boolean }>`
  position: relative;
  padding: 10px 20px;
  border-radius: 15px;
  font-size: 13px;
  line-height: 18px;

  > svg {
    position: absolute;
    transform: rotate(90deg);
    top: -5px;
  }
  ${({ isMe }) => {
    if (isMe) {
      return css`
        background: ${COLOR.PRIMARY};
        color: #fff;
        max-width: calc(100% - 98px);
        svg {
          right: -4px;
          fill: ${COLOR.PRIMARY};
        }
      `;
    } else {
      return css`
        background: #fff;
        color: ${COLOR.BLACK};
        margin-left: 14px;
        max-width: calc(100% - 142px);
        svg {
          left: -4px;
          fill: #fff;
        }
      `;
    }
  }}
  @media (min-width: 800px) {
    max-width: 50%;
  }
`;

const MessageTimestamp = styled.p<{ isMe: boolean }>`
  color: #aaa;

  position: absolute;
  bottom: 0;
  font-size: 11px;
  ${({ isMe }) => {
    if (isMe) {
      return css`
        left: -38px;
      `;
    } else {
      return css`
        right: -38px;
      `;
    }
  }}
`;

const ButtonWrapper = styled(Row)`
  position: absolute;
  background: #fff;
  right: -54px;
  bottom: 0;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.05);
  border-radius: 3px;
  button:first-of-type {
    border-right: 1px solid rgba(0, 0, 0, 0.05);
  }
`;

const Emoticon = styled.img`
  width: 100px;
  height: 100px;
`;

export default function MessageItem(props: Props) {
  const {
    content,
    createdAt,
    index,
    _id,
    user,
    userId,
    activeDropdown,
    setActiveDropdownIndex,
    searchValue,
    scrollMessageId,
  } = props;
  const { t } = useTranslation();
  const isMe = userId === user.id;
  const ref = useRef<HTMLDivElement>(null);
  const [dropdownOptions, setDropdownOptions] = useState<CustomDropdownStyleProps>({
    open: false,
    width: 170,
  });
  const [buttonsVisible, setButtonsVisible] = useState(false);

  useEffect(() => {
    setDropdownOptions({ ...dropdownOptions, open: activeDropdown });
  }, [activeDropdown, dropdownOptions]);

  useEffect(() => {
    ref.current &&
      ref.current.addEventListener('contextmenu', (e) => {
        const { offsetWidth, offsetHeight } = document.body;
        const x = e.clientX + 170 > offsetWidth ? e.clientX - 170 : e.clientX;
        const y = e.clientY + 170 > offsetHeight ? e.clientY - 170 : e.clientY;
        setDropdownOptions({
          ...dropdownOptions,
          x,
          y,
        });
        setActiveDropdownIndex(index);
      });
  }, [dropdownOptions, index, setActiveDropdownIndex]);

  useEffect(() => {
    if (scrollMessageId === _id && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [_id, scrollMessageId]);

  const menuList = [
    {
      label: `${t('chats.Mark as read')}`,
      onClick: () => {},
    },
    {
      label: `${t('chats.Mute notifications')}`,
      onClick: () => {},
      subMenu: [
        {
          label: `${t('chats.Mute notifications')}`,
          onClick: () => {},
        },
        {
          label: `${t('chats.Pin to top')}`,
          onClick: () => {},
        },
      ],
    },
    {
      label: `${t('chats.Pin to top')}`,
      onClick: () => {},
    },
  ];

  return (
    <>
      <CustomDropdown menuList={menuList} {...dropdownOptions} subPosition={isMe ? 'left' : 'right'} />
      <Wrapper
        justify={isMe ? 'flex-end' : 'start'}
        align="start"
        onMouseLeave={() => {
          setButtonsVisible(false);
        }}
      >
        {!isMe && <Avatar src={user?.profileImage ? user?.profileImage : ''} size={30} />}
        <ContentWrapper
          ref={ref}
          isMe={isMe}
          onMouseEnter={() => {
            setButtonsVisible(true);
          }}
        >
          <Tail />
          {searchValue && content.includes(searchValue) ? (
            <Highlighter
              searchWords={[searchValue]}
              autoEscape={true}
              textToHighlight={content}
              highlightStyle={{
                backgroundColor: 'black',
                color: '#fff',
              }}
            />
          ) : content.includes('https://sdk.mojitok.im') ? (
            <Emoticon src={content} />
          ) : (
            content
          )}{' '}
          <MessageTimestamp isMe={isMe}>{moment(createdAt).format('HH:MM')}</MessageTimestamp>
          {buttonsVisible && (
            <ButtonWrapper className={`button-wrapper`}>
              <IconTypeButton size={20}>
                <Reply />
              </IconTypeButton>
              <IconTypeButton size={20}>
                <Heart />
              </IconTypeButton>
            </ButtonWrapper>
          )}
        </ContentWrapper>
      </Wrapper>
    </>
  );
}
