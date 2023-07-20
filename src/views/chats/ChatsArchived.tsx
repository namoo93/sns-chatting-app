import React from 'react';
import { useQuery } from 'react-query';
import { TitleHeader } from 'components/molecules';
import { ChatRoomList } from './components/organisms';
import { getUser } from 'modules/user/api';
import { getArchives } from 'modules/chats/rooms/archives/api';
import { useTranslation } from 'react-i18next';

export default function ChatsArchived() {
  const { t } = useTranslation();
  const { data: userData } = useQuery('getUser', getUser);
  const { data: archivesData } = useQuery('getArchives', () => getArchives({ user_id: userData?.id || -1 }));

  if (archivesData) {
    return (
      <>
        <TitleHeader title={`${t('chats.Archive chats')}`} />
        {/*<ChatRoomList data={archivesData} userId={userData?.id} isMain={false} />*/}
      </>
    );
  }
  return <></>;
}
