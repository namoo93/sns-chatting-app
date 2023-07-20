import React from 'react';
import styled from 'styled-components';
import { Column } from 'components/layouts';
import { Icon, Heading4, Text } from 'components/atom';
import { useTranslation } from 'react-i18next';

type Props = {
  searchValue: string;
};

const Wrapper = styled(Column)`
  padding-top: 100px;
`;

const Title = styled(Heading4)`
  font-size: 18px;
  margin: 15px 0 8px;
`;
export default function NoResults({ searchValue }: Props) {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Icon src={'/images/chats/ic-no-result.svg'} size={52} />
      <Title>{t('chats.No Results')}</Title>
      <Text variant="caption_M">
        {t('chats.There were no results for')}'{searchValue}'
      </Text>
    </Wrapper>
  );
}
