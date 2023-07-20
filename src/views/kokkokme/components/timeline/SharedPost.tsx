import { COLOR } from 'constants/COLOR';
import React from 'react';
import styled from 'styled-components';
import Content from './Content';
import Images from './Images';
import PostHeader from '../header/PostHeader';
import { useTranslation } from 'react-i18next';

const ContainerWrap = styled.div`
  border: 1px solid #ededed;
  padding: 5px;
  cursor: pointer;
`;
const Container = styled.div`
  transform: scale(0.95);
`;
const OriginalByContainer = styled.p`
  margin-top: 3px;
  color: #bbb;
  font-size: 11px;
  margin-bottom: 10px;

  strong {
    color: ${COLOR.BLACK};
  }
`;

const SharedPost = ({ shared_post }) => {
  const { t } = useTranslation();
  const { user, image, contents, _id, created_at } = shared_post;

  return (
    <>
      <ContainerWrap>
        <Container>
          <PostHeader user={user} created_at={created_at} />
          <Images image={image} />
          <Content contents={contents} more={false} postId={_id} />
        </Container>
      </ContainerWrap>
      <OriginalByContainer>
        {t('sns.original post by')}
        {user.first_name + ' ' + user.last_name}
      </OriginalByContainer>
    </>
  );
};

export default SharedPost;
