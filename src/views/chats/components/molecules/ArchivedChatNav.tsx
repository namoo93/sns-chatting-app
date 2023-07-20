import React from 'react';
import styled from 'styled-components';
import { Row } from 'components/layouts';
import { Heading4, IconTypeButton } from 'components/atom';
import { COLOR } from 'constants/COLOR';
import { getCenter } from 'lib/getStyle';
import { FIXED_SIZE_WINDOW_OPTIONS } from 'constants/CONST';
import { ReactComponent as Archive } from 'assets/chats/ic_achive.svg';
import { useTranslation } from 'react-i18next';

type Props = {
  data: any[];
};

const Wrapper = styled(Row)`
  background: #f8f8f8;

  position: relative;
  padding: 20px;
  cursor: pointer;
`;

const Title = styled(Heading4)`
  font-size: 14px;
  margin-left: 10px;
`;

const Count = styled.span`
  font-size: 14px;
  color: ${COLOR.PRIMARY};
`;

const NavButton = styled(IconTypeButton)`
  ${getCenter({ v: true })}
  right: 20px;
`;

export default function ArchivedChatNav({ data }: Props) {
  const { t } = useTranslation();
  return (
    <Wrapper
      onClick={() => {
        window.open('/chats/archived', 'archived chats', FIXED_SIZE_WINDOW_OPTIONS);
      }}
    >
      <Archive />
      <Title>
        {t('chats.Archived Chats')}
        <Count>{data.length}</Count>
      </Title>
      <NavButton iconSrc={'chats/ic-next'} iconType={'svg'} size={22} />
    </Wrapper>
  );
}
