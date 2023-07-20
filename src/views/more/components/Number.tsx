import React from 'react';
import { IconTypeButton } from 'components/atom';
import { Row } from 'components/layouts';
import { Info, InfoContainer, Title } from 'views/more/components/UserInfoInputs';
import { useTranslation } from 'react-i18next';

export const Number = ({ cell, onClick }) => {
  const { t } = useTranslation();
  return (
    <InfoContainer align="center" fullWidth justify="space-between">
      <Row fullWidth>
        <Title marginRight={33}>{t('sns.Number')}</Title>
        <Info defaultValue={cell} placeholder="+82 010-6272-9032" readOnly onClick={onClick} />
      </Row>
      <IconTypeButton iconSrc="icon/ic-move" iconType="svg" onClick={onClick} />
    </InfoContainer>
  );
};
