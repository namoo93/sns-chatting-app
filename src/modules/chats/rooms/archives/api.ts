import apiManager from 'api-manager';
import * as Types from './types';

const prefix = 'chats';

export const getArchives = async (
  payload: Types.ArchivesPayload,
): Promise<Types.ArchivesEntity> => {
  const res = await apiManager.get(`${prefix}/rooms/archives`, payload);
  return res.data;
};

export const postArchive = async (
  payload: Types.ArchivePayload,
): Promise<Types.ArchiveEntity> => {
  const { user_id, room_id } = payload;
  const res = await apiManager.post(`${prefix}/rooms/${room_id}/archive`, {
    user_id,
  });
  return res.data;
};

export const postUnArchives = async (
  payload: Types.UnArchivesPayload,
): Promise<Types.UnArchivesEntity> => {
  const res = await apiManager.post(`${prefix}/rooms/unarchive-all`, payload);
  return res.data;
};

export const postUnArchive = async (
  payload: Types.UnArchivePayload,
): Promise<Types.UnArchiveEntity> => {
  const { user_id, room_id } = payload;
  const res = await apiManager.post(`${prefix}/rooms/${room_id}/unarchive`, {
    user_id,
  });
  return res.data;
};
