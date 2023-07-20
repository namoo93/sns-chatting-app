import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.span`
  .hash_tag {
    color: #088cf1;
  }
`;

const HashTag = ({ text, active }) => {
  const navigate = useNavigate();
  // console.log(text);

  const openSearch = () => {
    if (active) {
      navigate('/kokkokme/kokkokeme-search', { state: text });
    }
  };
  return (
    <Container>
      <button className="hash_tag" onClick={() => openSearch()}>
        {text}
      </button>
      &nbsp;
    </Container>
  );
};

export default HashTag;
