import React from 'react';
import styled from 'styled-components';
import Content from './Content';
import Images from './Images';
import MetaInfoButtons from './MetaInfoButtons';
import PostHeader from '../header/PostHeader';
import Videos from './Videos';

const Container = styled.li`
  margin-bottom: 35px;

  &:last-child {
    margin-bottom: 10px;
  }
`;

const Post = ({ post }) => {
  // console.log(post);
  const { _id, contents, image, created_at, is_like, likecount, commentcount, user, keyword } = post;

  return (
    <Container>
      {_id && (
        <>
          <PostHeader user={user} created_at={created_at} />
          {/* {shared_post && <SharedPost shared_post={shared_post} />} */}
          <Images image={image} />
          {/* {video && video.length > 0 && <Videos video={video} />} */}
          <Content contents={contents} postId={_id} active={false} keyword={keyword} />
          <MetaInfoButtons likecount={likecount} commentcount={commentcount} is_like={is_like} postId={_id} />
        </>
      )}
    </Container>
  );
};

export default Post;
