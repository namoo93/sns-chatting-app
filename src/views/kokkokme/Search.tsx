import { Avatar } from 'components/atom';
import NavbarLayout from 'components/layouts/NavbarLayout';
import { NoResults, SearchBar, TabMenu } from 'components/molecules';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import certificationImg from 'assets/authenticaton-check.svg';
import ic_nocontract from 'assets/auth/ic_nocontract.svg';
import { Timeline } from './components/timeline';
import { MAX_WIDTH, MIN_WIDTH } from 'constants/WIDTH';
import { COLOR } from 'constants/COLOR';
import useFetch from 'net/useFetch';
import Post from './components/timeline/Post';
import InfiniteScroll from 'react-infinite-scroll-component';
import { noFrameWindowOptions } from 'constants/CONST';
import { useTranslation } from 'react-i18next';

const TABS = [
  { label: 'Accounts', value: ['users'] },
  { label: 'Posts', value: ['keyword', 'hash'] },
  // { label: 'Live', value:'live' }
];
const DUMMY_POSTS: any[] = [];

const HeaderTabContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: calc(100vw - 65px);
  height: 50px;
  background-color: #fff;
  margin: -10px 0 0 -20px;
`;

const Tab = styled.button<{ active: boolean }>`
  display: flex;
  flex: 1;
  border-bottom-width: 2px;
  justify-content: center;
  align-items: center;
  border-color: ${({ active }) => (active ? COLOR.PRIMARY : '#999')}; ;
`;

const TabText = styled.span<{ active: boolean }>`
  color: ${({ active }) => (active ? COLOR.PRIMARY : '#999')};
  font-size: 14px;
`;

const HeaderContainer = styled.div`
  /* display: flex;
  align-items: center; */
  /* justify-content: space-between; */
  padding: 37px 20px 0px 20px;

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

const Container = styled.div<{ headerHeight: boolean }>`
  margin: 0 auto;
  max-width: ${MAX_WIDTH}px;
  min-width: ${MIN_WIDTH}px;
  background-color: #fff;
  height: ${({ headerHeight }) => (headerHeight ? 'calc(100vh - 155px);' : 'calc(100vh - 145px);')};
  overflow-y: auto;
  border-top: 1px solid #f8f8f8;
`;
const ContentsContainer = styled.ul``;

const ProfileWrap = styled.button`
  display: block;
  text-align: left;
  width: 100%;
  padding: 10px 20px;

  img {
    float: left;
  }
  p {
    float: left;
    margin-left: 10px;
    width: calc(100% - 60px);
    /* overflow: hidden; */
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
  }
  .profile_title {
    font-size: 15px;
    font-weight: 500;
    color: #262525;
    margin-top: 6px;

    img {
      display: inline-block;
      width: 18px;
      height: 18px;
      margin-left: 5px;
      position: absolute;
      margin-top: -3px;
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

const PostContainer = styled.div`
  padding: 15px 20px;
`;
const InfoNoUsersWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;

  img {
    margin-top: 80px;
  }
  .info_title {
    font-size: 16px;
    font-weight: 500;
    color: #262525;
    padding-top: 10px;
  }
  .bottom_90 {
    padding-bottom: 90px;
  }

  p {
    font-size: 12px;
    color: #999;
  }

  .info_box {
    width: 100%;
    padding: 20px;
    opacity: 0.8;
    border-radius: 10px;
    background-color: #f8f8f8;
    margin-bottom: 20px;

    .info_box_title {
      color: #262525;
    }
  }
`;

const Search = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState<string>('');
  const [tabValue, setTabValue] = useState<string>('users');
  const [tabShow, setTabShow] = useState<boolean>(false);
  const [tagSearch, setTagSearch] = useState<boolean>(false);

  const [perPage, setPage] = useState<number>(1);

  const { data, error } = useFetch(
    `/socials/search?type=${tabValue}&contents=${searchValue.replace('#', '')}&page=${perPage}&limit=10`,
  );

  const [userList, setUserList] = useState<any>([]);
  const [keywordList, setKeywordList] = useState<any>([]);

  const handleChange = (value: string) => {
    setSearchValue(value);
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter' && searchValue !== '') {
      setSearchValue(e.target.value);
      setTabShow(true);
    } else {
      setTabShow(false);
    }
  };

  useEffect(() => {
    if (tabValue === 'users') {
      setUserList([]);
    }
    if (tabValue === 'keyword') {
      setKeywordList([]);
    }
    if (searchValue?.charAt(0) === '#') {
      setTabValue('hash');
    }
  }, [searchValue]);

  useEffect(() => {
    if (!data) return;
    if (tabValue === 'users') {
      setUserList((u) => [...u, ...data]);
    }
    if (!data?.docs) return;
    if (TABS[1].value?.includes(tabValue)) {
      setKeywordList((k) => [...k, ...data?.docs]);
    }
  }, [data]);

  useEffect(() => {
    if (location.state !== null) {
      const text = location.state as string;
      setSearchValue(text);
      setTabShow(true);
      setTabValue('posts');
      setTagSearch(true);
    }
  }, [location.state]);

  const onClickUserList = (uid, id) => {
    navigate(`/kokkokme/user-timeline/${id}&${uid}`);
  };

  return (
    <InfiniteScroll
      hasMore={!error}
      loader={<></>}
      dataLength={tabValue === 'users' ? userList?.length : keywordList?.length}
      next={() => setPage((p) => p + 1)}
      scrollableTarget={'infiniteScrollDiv'}
    >
      <NavbarLayout color={'#f8f8f8'} themeColor={false} scroll>
        <StickyWrapper>
          <HeaderContainer>
            <SearchBar
              value={searchValue}
              withCancel={true}
              onChange={handleChange}
              onKeyUp={(e) => handleKeyUp(e)}
              onClick={() => navigate(-1)}
              placeholder={`${t('sns.Name, keywords and #hashtags')}`}
              isBack={tagSearch}
              borderNone={tagSearch}
              className={tagSearch ? 'tagSearch_margin' : ''}
            />
            <HeaderTabContainer>
              {TABS.map((tab) => (
                <Tab
                  active={tab.value.includes(tabValue)}
                  onClick={() => {
                    setTabValue(tab.value[0]);
                  }}
                >
                  <TabText active={tab.value.includes(tabValue)}>{tab.label}</TabText>
                </Tab>
              ))}
            </HeaderTabContainer>
          </HeaderContainer>
        </StickyWrapper>

        <Container headerHeight={!tabShow}>
          <ContentsContainer>
            {/* 유저검색 결과 */}
            {tabValue === 'users' &&
              userList?.length !== 0 &&
              userList?.map((user) => (
                <li key={user}>
                  <ProfileWrap onClick={() => onClickUserList(user?.uid, user.id)}>
                    <Avatar size={40} src={user?.profile_image} />
                    <p className="profile_title">
                      {user?.first_name + ' ' + user?.last_name}
                      {<img alt="" src={certificationImg} />}
                      {/* {user?.official_account === 1 && <img alt="" src={certificationImg} /> } */}
                    </p>
                    <p className="profile_sub">{user?.uid}</p>
                  </ProfileWrap>
                </li>
              ))}
            {/* 게시물검색 결과 */}
            {tabValue === 'keyword' &&
              keywordList?.length !== 0 &&
              keywordList?.map((post) => (
                <PostContainer>
                  <Post post={{ ...post, keyword: searchValue }} />
                </PostContainer>
              ))}
            {/* 결과없음: TODO 키워드 바뀔때마다 깜빡임 flag 필요함 */}
            {searchValue && tabValue === 'users' && userList.length === 0 && <NoResults searchValue={searchValue} />}
            {searchValue && TABS[1].value.includes(tabValue) && keywordList.length === 0 && (
              <NoResults searchValue={searchValue} />
            )}
          </ContentsContainer>
        </Container>
      </NavbarLayout>
    </InfiniteScroll>
  );
};

export default Search;

{
  /* hashtag 검색시 예외처리 필요 */
}
