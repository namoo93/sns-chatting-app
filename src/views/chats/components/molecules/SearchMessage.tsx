import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Row } from 'components/layouts';
import { COLOR } from 'constants/COLOR';
import { IconTypeButton } from 'components/atom';
import { ReactComponent as Close } from 'assets/common/ic_close.svg';
import { ReactComponent as Search } from 'assets/chats/ic_search.svg';
import { ReactComponent as CloseRound } from 'assets/chats/ic_close_round.svg';
import { ReactComponent as Up } from 'assets/chats/ic_arrow_up.svg';
import { ReactComponent as Down } from 'assets/chats/ic_arrow_down.svg';

type Props = {
  handleSearchVisible: () => void;
  setSearchValue: (value: string) => void;
  searchedMessageList: any[];
  setScrollMessageId: (id: string) => void;
};

const Wrapper = styled(Row)`
  position: fixed;
  top: 90px;
  width: 100%;
  background: #f3f3f3;
  padding: 12px 20px 12px 16px;
  z-index: 99;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 66px;
`;

const Input = styled.input`
  width: calc(100% - 32px);
  height: 42px;
  border: 1px solid ${COLOR.BLACK};
  margin-left: 15px;
  padding: 0 100px 0 38px;
  outline: none;
`;

const ButtonWrapper = styled(Row)`
  position: absolute;
  right: 35px;
  button:nth-child(2) {
    margin-left: 14px;
  }
`;

export default function SearchMessage({
  handleSearchVisible,
  setSearchValue,
  searchedMessageList,
  setScrollMessageId,
}: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [scrollIdIndex, setScrollIdIndex] = useState<null | number>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);

  useEffect(() => {
    console.log(searchedMessageList);
    if (typeof scrollIdIndex === 'number') {
      setScrollMessageId(searchedMessageList[scrollIdIndex]._id);
    }
  }, [scrollIdIndex, searchedMessageList, setScrollMessageId]);
  useEffect(() => {
    if (searchedMessageList.length) {
      setScrollIdIndex(searchedMessageList.length - 1);
    }
  }, [searchedMessageList]);

  return (
    <Wrapper>
      <IconTypeButton
        onClick={() => {
          setValue('');
          handleSearchVisible();
          setScrollMessageId('');
        }}
      >
        <Close />
      </IconTypeButton>
      <SearchIcon />
      <Input
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            setSearchValue(value);
          }
        }}
      />
      <ButtonWrapper>
        <IconTypeButton onClick={() => setValue('')}>
          <CloseRound />
        </IconTypeButton>
        <IconTypeButton
          onClick={() => {
            if (scrollIdIndex !== null) {
              if (scrollIdIndex === searchedMessageList.length - 1) {
                return;
              }
              setScrollIdIndex(scrollIdIndex + 1);
            }
          }}
        >
          <Up />
        </IconTypeButton>
        <IconTypeButton
          onClick={() => {
            if (scrollIdIndex !== null) {
              if (scrollIdIndex === 0) {
                return;
              }
              setScrollIdIndex(scrollIdIndex - 1);
            }
          }}
        >
          <Down />
        </IconTypeButton>
      </ButtonWrapper>
    </Wrapper>
  );
}
