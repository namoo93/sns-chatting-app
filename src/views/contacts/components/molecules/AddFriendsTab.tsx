import React from 'react';
import styled from 'styled-components';
import { COLOR } from 'constants/COLOR';
import { useTranslation } from 'react-i18next';

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50px;
  background-color: #fff;
  border-top: 1px solid #ededed;
`;

const Tab = styled.button<{ active: boolean }>`
  display: flex;
  flex: 1;
  border-bottom-width: 2px;
  justify-content: center;
  align-items: center;
  border-color: ${({ active }) => (active ? COLOR.PRIMARY : '#999')}; ;
`;

const TabText = styled.span<{ active: boolean }>`
  color: ${({ active }) => (active ? COLOR.PRIMARY : '#999')};
  font-size: 14px;
`;

export const AddFriendsTab = ({ active, setActive, setAddState, setCopied }: any) => {
  const { t } = useTranslation();
  return (
    <>
      <TabContainer>
        <Tab
          active={active === 'PhoneNumber'}
          onClick={() => {
            setActive('PhoneNumber');
            setCopied(false);
          }}
        >
          <TabText active={active === 'PhoneNumber'}>{t('contact.Phone number')}</TabText>
        </Tab>
        <Tab
          active={active === 'AppSharing'}
          onClick={() => {
            setActive('AppSharing');
            setAddState(false);
          }}
        >
          <TabText active={active === 'AppSharing'}>{t('contact.app sharing')}</TabText>
        </Tab>
      </TabContainer>
    </>
  );
};
