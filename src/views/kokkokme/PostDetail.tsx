import { Avatar, Button, ButtonVariant, Icon } from 'components/atom';
import { COLOR } from 'constants/COLOR';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Comments from './components/detail/Comments';
import Content from './components/timeline/Content';
import Images from './components/timeline/Images';
import MetaInfoButtons from './components/timeline/MetaInfoButtons';
import PostHeader from './components/header/PostHeader';
import { useFetchWithType } from 'net/useFetch';
import SwrContainer from 'components/containers/SwrContainer';
import { MAX_WIDTH, MIN_WIDTH } from 'constants/WIDTH';
import Post from '../../types/socials/likes/Post';
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import userAtom from '../../stores/userAtom';
import { post as postAction } from '../../net/rest/api';
import CommentsType from '../../types/socials/comments/Comments';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  background-color: #f8f8f8;
  overflow: hidden;
`;
const ScrollWrap = styled.div`
  overflow-y: auto;
  height: 100vh;
  padding-bottom: 124px;
`;
const InputBottomWrapper = styled.div`
  border-top: 1px solid #ededed;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 1000;
`;
const BottomWrap = styled.div`
  padding: 0 20px;
  padding-top: 15px;
`;

const DetailContainer = styled.div`
  margin: 0 auto;
  max-width: ${MAX_WIDTH}px;
  min-width: ${MIN_WIDTH}px;
  background-color: #fff;
  height: fit-content;
  padding: 15px 20px 20px;

  .location {
    display: flex;
    align-items: center;
    padding-bottom: 5px;
    img {
      display: inline-block;
      padding-right: 3px;
    }
    span {
      color: #bbb;
      font-size: 13px;
      padding-top: 2px;
    }
  }

  .tag_friends {
    button {
      background-color: #ededed;
      padding: 2px 8px;
      padding-top: 4px;
      border-radius: 24px;
      margin-right: 5px;
      font-size: 15px;
      color: ${COLOR.BLACK};
    }
  }
`;

const InputComment = styled.div`
  border-top: 1px solid #ededed;
  margin-top: 15px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${COLOR.BLACK};

  input {
    width: calc(100% - 110px);
    font-size: 16px;

    &::placeholder {
      color: #bbb;
    }
  }
`;

const PostDetail = () => {
  const { t } = useTranslation();
  const params = useParams();
  const { postId } = params;
  const { data: post, error: postError } = useFetchWithType<Post>(`/socials/posts/${postId}`);
  const {
    data: comments,
    error: commentsError,
    mutate: mutateComments,
  } = useFetchWithType<CommentsType[]>(`/socials/comments?post_id=${postId}&order=-1&page=1&limit=10`);
  const [contents, setContents] = useState<string>('');
  const user = useAtomValue(userAtom);

  return (
    <Container>
      <ScrollWrap>
        <SwrContainer data={post} error={postError}>
          {post && (
            <DetailContainer>
              <PostHeader user={post.user} created_at={post.created_at} />
              <Images image={post.image} />
              <Content
                contents={post.contents}
                postId={'_id'}
                show={true}
                more={false}
                preventDefault={false}
                active={true}
              />

              {/* 위치 태그 */}
              <p className="location">
                <Icon size={22} src={'/images/ic-location-gray22.svg'} />
                <span>TODO: Location Here</span>
              </p>
              {/* 태그된 친구 */}
              <p className="tag_friends">
                {post.taged_user_ids.map((tag) => (
                  <button onClick={() => {}}>{tag?.uid}</button>
                ))}
              </p>
            </DetailContainer>
          )}
        </SwrContainer>
        {/* 댓글 */}
        {comments && <Comments comments={comments} mutate={mutateComments} />}
      </ScrollWrap>

      <InputBottomWrapper>
        <BottomWrap>
          <MetaInfoButtons likecount={undefined} commentcount={undefined} is_like={undefined} postId={postId} />
        </BottomWrap>
        <InputComment>
          <Avatar size={30} src={''} onClick={() => {}} />
          <input
            type="text"
            placeholder={`${t('sns.Comment')}..`}
            value={contents}
            onChange={(event) => setContents(event.target.value)}
          />
          <Button
            onClick={() => {
              postAction('/socials/comments', {
                post_id: postId,
                contents,
                post_user_id: user?.id,
              }).then(() => {
                setContents('');
                mutateComments();
              });
            }}
            width={52}
            height={20}
            variant={ButtonVariant.Text}
          >
            {t('sns.Posting')}
          </Button>
        </InputComment>
      </InputBottomWrapper>
    </Container>
  );
};

export default PostDetail;
