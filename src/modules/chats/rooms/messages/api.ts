import apiManager from 'api-manager';
import { replaceQuery } from 'lib/queryUrl';
import * as Types from './types';

const prefix = 'chats';

export const getMessages = async (
  payload: Types.MessagesPayload,
): Promise<Types.MessagesEntity> => {
  const { room_id, page, limit } = payload;
  const res = await apiManager.get(
    `${prefix}/rooms/${room_id}/messages?page=${page}&limit=${limit}`,
  );
  return res.data;
};

export const getAllMessages = async (
  payload: Types.MessagesPayload,
): Promise<Types.MessagesEntity> => {
  const { room_id } = payload;
  const res = await apiManager.get(
    `${prefix}/rooms/${room_id}/messages?type=all`,
  );
  return res.data;
};
export const getMessage = async (
  payload: Types.MessagePayload,
): Promise<Types.MessageEntity> => {
  const { room_id, message_id } = payload;
  const res = await apiManager.get(
    `${prefix}/rooms/${room_id}/messages/${message_id}`,
  );
  return res.data;
};

export const deleteMessage = async (
  payload: Types.MessagePayload,
): Promise<Types.MessageEntity> => {
  const { room_id, message_id } = payload;
  const res = await apiManager.delete(
    `${prefix}/rooms/${room_id}/messages/${message_id}`,
  );
  return res.data;
};

export const getSearchMessages = async (
  payload: Types.SearchMessagePayload,
): Promise<Types.SearchMessageEntity> => {
  const { room_id, search_word } = payload;
  const res = await apiManager.get(
    `${prefix}/rooms/${room_id}/messages/search?search_word=${replaceQuery(
      search_word,
    )}`,
  );
  return res.data;
};
