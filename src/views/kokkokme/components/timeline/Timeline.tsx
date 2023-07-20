import { NoResults } from 'components/molecules';
import { MAX_WIDTH, MIN_WIDTH } from 'constants/WIDTH';
import React from 'react';
import styled from 'styled-components';
import Post from './Post';

const Container = styled.div`
  margin: 0 auto;
  max-width: ${MAX_WIDTH}px;
  min-width: ${MIN_WIDTH}px;
  background-color: #fff;
  height: fit-content;
  padding: 15px 20px 20px;
`;
const ContentsContainer = styled.ul``;
const NoResultsContainer = styled.div`
  height: calc(100vh - 133px);
`;

const Timeline = ({ data }: any) => {
  return (
    <Container>
      {data.length === 0 ? (
        <NoResultsContainer>
          <NoResults searchValue={'post'} />
        </NoResultsContainer>
      ) : (
        <ContentsContainer>
          {data?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </ContentsContainer>
      )}
    </Container>
  );
};

export default Timeline;
