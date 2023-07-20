import React, { useEffect, useState } from 'react';
import { COLOR } from 'constants/COLOR';
import styled from 'styled-components';
import CommentOff from 'assets/ic-message-22.svg';
import CommentOn from 'assets/ic-message-on-22.svg';
import LikeOff from 'assets/ic-like-22.svg';
import LikeON from 'assets/ic-like-on-22.svg';
import { noFrameWindowOptions } from 'constants/CONST';
import { useFetchWithType } from 'net/useFetch';
import SwrContainer from 'components/containers/SwrContainer';
import LikesList from 'types/socials/likes/LikesList';
import { useTranslation } from 'react-i18next';
import { post, remove } from 'net/rest/api';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 8px;

    img {
      display: inline-block;
      width: 22px;
      height: 22px;
      margin-right: 2px;
    }
    .count {
      font-size: 13px;
      font-weight: 500;
      color: ${COLOR.BLACK};
    }
  }
`;
const LikedByContainer = styled.p`
  width: 100%;
  margin-top: 3px;
  color: #bbb;
  font-size: 11px;
  cursor: pointer;

  strong {
    color: ${COLOR.BLACK};
  }
`;

const MetaInfoButtons = ({ likecount, commentcount, is_like, postId }) => {
  const { t } = useTranslation();
  const {
    data: likesData,
    error: likesError,
    mutate: likesDataMutate,
  } = useFetchWithType<LikesList>(`/socials/likes/${postId}?page=1&limit=10`);
  // const { data: isLikesData, error: isLikesError } = useFetch();

  const [isLike, setIsLike] = useState<boolean>(is_like !== 0);
  const [count, setCount] = useState(likecount);

  const openlikes = () => {
    window.open(`/kokkokme/likes/${postId}`, 'Likes', noFrameWindowOptions);
  };

  const handleLike = () => {
    if (!isLike) {
      post(`socials/likes`, { post_id: postId }).then(() => {
        setCount(count + 1);
        setIsLike(!isLike);
        likesDataMutate();
      });
    } else {
      remove(`socials/likes/${postId}`).then(() => {
        setCount(count - 1);
        setIsLike(!isLike);
        likesDataMutate();
      });
    }
  };

  return (
    <Container>
      <SwrContainer data={likesData} error={likesError}>
        <>
          <button type="button" onClick={() => handleLike()}>
            {isLike ? <img src={LikeON} alt="" /> : <img src={LikeOff} alt="" />}
            <span className="count">{count}</span>
          </button>
          <button type="button">
            {commentcount ? <img src={CommentOn} alt="" /> : <img src={CommentOff} alt="" />}
            <span className="count">{commentcount}</span>
          </button>

          <LikedByContainer onClick={() => openlikes()}>
            {likesData && likesData.docs.length > 0 && (
              <>
                {`${t('sns.Liked by')} `}
                <strong>
                  {likesData?.docs[0].user_info.first_name} {likesData?.docs[0].user_info.last_name}
                </strong>
                {likesData?.docs.length > 1 && ` ${t('sns.and others')}`}
              </>
            )}
          </LikedByContainer>
        </>
      </SwrContainer>
    </Container>
  );
};

export default MetaInfoButtons;
