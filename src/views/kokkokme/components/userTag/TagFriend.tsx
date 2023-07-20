import { Avatar } from 'components/atom';
import { SearchBar } from 'components/molecules';
import React, { useState } from 'react';
import styled from 'styled-components';
import certificationImg from 'assets/authenticaton-check.svg';
import useFetch from 'net/useFetch';
import { tagFriendType } from 'views/kokkokme/KokKokMePost';
import { MIN_WIDTH } from 'constants/WIDTH';
import { useTranslation } from 'react-i18next';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .tagSearch_margin {
    margin: 0;
  }
`;

const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1000;
`;

const Container = styled.div`
  margin: 0 auto;
  /* max-width: 675px; */
  min-width: ${MIN_WIDTH}px;
  background-color: #fff;
  height: 100vh;
  overflow-y: auto;
  border-top: 1px solid #f8f8f8;
`;
const ContentsContainer = styled.ul``;

const ProfileWrap = styled.button<{ selected: boolean }>`
  text-align: left;
  width: 100%;
  padding: 10px 20px;
  display: flex;
  align-items: center;

  background: ${(prop) => (prop.selected ? '#ffe9d4' : 'white')};
  img {
    float: left;
  }
  p {
    float: left;
    margin-left: 10px;
    width: calc(100% - 60px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .profile_title {
    font-size: 15px;
    font-weight: 500;
    color: #262525;

    img {
      float: none;
      display: inline-block;
      width: 18px;
      height: 18px;
      margin-left: 5px;
    }
  }
  .profile_sub {
    font-size: 13px;
    color: #bcb3c5;
  }
  &::after {
    content: '';
    display: block;
    clear: both;
  }
  &:hover {
    background-color: #fcf2e8;
  }
`;

const TextWrap = styled.div`
  margin-top: 3px;
`;

type SearchProps = {
  tags: tagFriendType[];
  onChange: (tags: tagFriendType[]) => void;
};
const Search = ({ tags, onChange }: SearchProps) => {
  const { t } = useTranslation();
  // const navigate = useNavigate();

  // const [selected, setSelected] = useState<string[]>(tags || [])
  const [keyword, setKeyword] = useState('');
  const { data } = useFetch(`/socials/follows/tag?search_word=${keyword}&page=10&limit=0`);

  console.log(data);
  return (
    <Container>
      <StickyWrapper>
        <HeaderContainer>
          <SearchBar
            value={keyword}
            withCancel={true}
            onChange={setKeyword}
            placeholder={`${t('sns.Name, keywords and #hashtags')}`}
          />
        </HeaderContainer>
      </StickyWrapper>
      <ContentsContainer>
        {data?.length !== 0 &&
          !!keyword &&
          data?.items?.map((user) => {
            return (
              <li key={user?.user_id}>
                <ProfileWrap
                  selected={!!tags?.filter((f) => f.uid === user?.uid).length}
                  onClick={() => {
                    if (!!tags.filter((f) => f === user?.uid).length) onChange(tags.filter((t) => t.id !== user.id));
                    else onChange([...tags, { uid: user.uid, id: user.id }]);
                  }}
                >
                  <Avatar size={40} src={user?.profile_image} />
                  <TextWrap>
                    <p className="profile_title">
                      {user?.first_name + ' ' + user?.last_name}
                      {!!user?.officialAccount ? <img alt="" src={certificationImg} /> : <></>}
                    </p>
                    <p className="profile_sub">@{user?.uid}</p>
                  </TextWrap>
                </ProfileWrap>
              </li>
            );
          })}
      </ContentsContainer>
    </Container>
  );
};

export default Search;
