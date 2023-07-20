import NavbarLayout from 'components/layouts/NavbarLayout';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IconButton } from 'components/atom';
import { SnsHeader } from './components/header/SnsHeader';
import { Timeline } from 'views/kokkokme/components/timeline';
import { newFixedSizeWindowOptions_1024, noFrameWindowOptions } from 'constants/CONST';
import { IconModal, NoResults } from 'components/molecules';
import { ModalContext } from 'contexts';
import useFetch from 'net/useFetch';
import SwrContainer from 'components/containers/SwrContainer';
import { useAtomValue } from 'jotai';
import userAtom from 'stores/userAtom';
import { useCallback, useContext, useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { mutate } from 'swr';
import { get } from 'net/rest/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MAX_WIDTH, MIN_WIDTH } from 'constants/WIDTH';
import Post from './components/timeline/Post';

const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1000;
`;

const ContentsContainer = styled.ul``;
const NoResultsContainer = styled.div`
  height: calc(100vh - 133px);
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: ${MAX_WIDTH}px;
  min-width: ${MIN_WIDTH}px;
  background-color: #fff;
  height: fit-content;
  padding: 15px 20px 20px;
`;
function KokKokMeMain() {
  const navigate = useNavigate();
  const { openModal, closeModal } = useContext(ModalContext);
  const [newNotice, setNewNotice] = useState(false);
  const [perPage, setPage] = useState(1);
  const [timelines, setTimelines] = useState([{}]);

  const user = useAtomValue(userAtom);
  const { data: postData, error: postError } = useFetch(`/socials/timeline?page=${perPage}&limit=10`);

  const openActivity = () => {
    window.open('/kokkokme/user-timeline/activity', 'Activity', noFrameWindowOptions);
    setNewNotice(false);
  };

  useEffect(() => {
    get('/socials/notis?page=1&limit=10').then((res) => {
      // @ts-ignore
      const noRead = res.docs.filter((item) => item.read === false);
      console.log(noRead.length);
      if (noRead.length > 0) setNewNotice(true);
    });
  }, []);

  useEffect(() => {
    if (!postData) return;
    setTimelines([...timelines, ...postData]);
  }, [postData]);

  const openModalNewPost = () => {
    const snsOptions = [
      { imgSrc: '/images/new_post.svg', size: 28, name: 'New Post' },
      // { imgSrc: '/images/new_live.svg', size: 28, name: 'Start Live' },
    ];
    const openPages = (value) => {
      if (value === 'New Post') {
        window.open('/kokkokme/kokkokme-post', 'KokKokMePost', newFixedSizeWindowOptions_1024);
        closeModal();
      }
    };

    openModal(
      <IconModal
        rightTitle={'New'}
        topMenuIcon={false}
        options={snsOptions}
        onClickOption={(value) => openPages(value)}
        closeModal={closeModal}
        width={'90px'}
      />,
    );
  };

  const buttonList = [
    {
      iconName: 'ic-search-22',
      onClick: () => navigate('/kokkokme/kokkokeme-search'),
    },
    {
      iconName: 'ic-write-22',
      onClick: () => openModalNewPost(),
    },
    newNotice
      ? {
          iconName: 'ic-notice-on-22',
          onClick: () => openActivity(),
        }
      : {
          iconName: 'ic-notice-22',
          onClick: () => openActivity(),
        },
  ];

  return (
    <InfiniteScroll
      hasMore={!postError}
      loader={<></>}
      dataLength={postData?.length || 0}
      next={() => postData && setPage((p) => p + 1)}
      scrollableTarget={'infiniteScrollDiv'}
    >
      <NavbarLayout color={'#f8f8f8'} themeColor={false} scroll>
        <StickyWrapper>
          <SnsHeader
            user={user}
            button={buttonList.map((button, i) => (
              <IconButton key={i} width={22} iconName={button.iconName} iconOnly onClick={button.onClick} />
            ))}
          />
        </StickyWrapper>
        <SwrContainer data={timelines} error={postError}>
          <Container>
            {timelines?.length === 0 ? (
              <NoResultsContainer>
                <NoResults searchValue={'post'} />
              </NoResultsContainer>
            ) : (
              <ContentsContainer>
                {timelines?.map((post) => (
                  <Post post={post} />
                ))}
              </ContentsContainer>
            )}
          </Container>
        </SwrContainer>
      </NavbarLayout>
    </InfiniteScroll>
  );
}

export default KokKokMeMain;
