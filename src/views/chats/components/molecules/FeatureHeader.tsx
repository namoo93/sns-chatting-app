import React from 'react';
import styled from 'styled-components';
import { Row } from 'components/layouts';
import { IconButton } from 'components/atom';
import { useTranslation } from 'react-i18next';

const Wrapper = styled(Row)`
  position: fixed;
  top: 90px;
  width: 100%;
  background: rgba(153, 153, 153, 0.8);
  padding: 14px 0;
  z-index: 99;
`;

export default function FeatureHeader() {
  const { t } = useTranslation();
  return (
    <Wrapper justify="center">
      <IconButton
        iconName={'ic-add'}
        iconType="svg"
        onClick={() => {}}
        marginRight={34}
        textMarginLeft={5}
        fontSize={13}
        backgroundColor={'transparent'}
        borderRadius
      >
        {t('chats.Add friend')}
      </IconButton>
      <IconButton
        iconName={'ic-block'}
        iconType="svg"
        onClick={() => {}}
        marginRight={34}
        textMarginLeft={5}
        fontSize={13}
        backgroundColor={'transparent'}
        borderRadius
      >
        {t('chats.Block')}
      </IconButton>
      <IconButton
        iconName={'ic-exit'}
        iconType="svg"
        onClick={() => {}}
        textMarginLeft={5}
        fontSize={13}
        backgroundColor={'transparent'}
        borderRadius
      >
        {t('chats.Exit')}
      </IconButton>
    </Wrapper>
  );
}
