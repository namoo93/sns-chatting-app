import { COLOR } from 'constants/COLOR';
import { newFixedSizeWindowOptions_1024 } from 'constants/CONST';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HashTag from './HashTag';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  &.margin_bottom10 {
    margin-bottom: 10px;
  }
  &.margin_bottom-10 {
    margin-bottom: -10px;
  }
`;

const TextContainer = styled.button`
  position: relative;
  display: block;
  text-align: left;
  word-break: keep-all;
  font-size: 15px;
  color: #999;
  line-height: 1.4;

  .ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .more {
    text-align: right;
    font-size: 15px;
    color: ${COLOR.PRIMARY};
  }

  &.preventDefault {
    cursor: default;
  }
`;

interface Props {
  postId: string;
  contents: string;
  more?: boolean;
  show?: boolean;
  preventDefault?: boolean;
  active?: boolean;
  keyword?: string;
}

const Content = ({ contents, postId, more = true, preventDefault = true, active, keyword, ...props }: Props) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(props.show);

  useEffect(() => {
    if (contents?.length > 265) {
      setShow(true);
    }
  }, [contents]);

  const openDetail = () => {
    if (preventDefault) {
      window.open(`/kokkokme/post-detail/${postId}`, 'Post-detail', newFixedSizeWindowOptions_1024);
    }
  };

  console.log(contents?.split(/(#[^\s!@#$%^&*()=+./,[{\]};:'"?><]+)/g));
  return (
    <Container className={show && more ? `margin_bottom-10` : `margin_bottom10`}>
      <TextContainer className={!preventDefault ? `preventDefault` : ``}>
        <span className={show ? `` : `ellipsis`} onClick={() => openDetail()}>
          {contents
            ?.split(/(#[^\s!@#$%^&*()=+./,[{\]};:'"?><]+)/g)
            .map((text, i) =>
              text.includes('#') ? <HashTag key={i} text={text} active={active} /> : <span key={i}>{text}</span>,
            )}
        </span>
        {show && more && (
          <p className="more" onClick={() => openDetail()}>
            {t('chats.more')}
          </p>
        )}
      </TextContainer>
    </Container>
  );
};

export default Content;
