import apiManager from 'api-manager';
import * as Types from './types';

const prefix = 'chats';

export const postSaveMesssage = async (
  payload: Types.SaveMessagePayload,
): Promise<Types.SaveMessageEntity> => {
  const {room_id, message_id} = payload;
  const res = await apiManager.post(
    `${prefix}/rooms/${room_id}/messages/${message_id}/save`,
  );
  return res.data;
};

export const postUnSaveMesssage = async (
  payload: Types.UnSaveMessagePayload,
): Promise<Types.UnSaveMessageEntity> => {
  const {room_id, message_id} = payload;
  const res = await apiManager.post(
    `${prefix}/rooms/${room_id}/messages/${message_id}/unsave`,
  );
  return res.data;
};

export const getSaveMesssages = async (
  payload: Types.UnSaveMessagePayload,
): Promise<Types.UnSaveMessageEntity> => {
  const res = await apiManager.get(`${prefix}/messages/saves`, payload);
  return res.data;
};
