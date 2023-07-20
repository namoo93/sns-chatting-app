import apiManager from 'api-manager';
import * as Types from './types';

const prefix = 'chats';

export const postCreateCall = async (
  payload: Types.CallPayload,
): Promise<Types.CreateCallEntity> => {
  const {room_id, type} = payload;
  const res = await apiManager.post(`${prefix}/rooms/${room_id}/calls/create`, {
    type,
  });
  return res.data;
};

export const postEnterCall = async (
  payload: Types.CallPayload,
): Promise<Types.EnterCallEntity> => {
  const {room_id, type} = payload;
  const res = await apiManager.post(
    `${prefix}/rooms/${room_id}/calls/attendees`,
    {type},
  );
  return res.data;
};
