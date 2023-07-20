import apiManager from 'api-manager';
import * as Types from './types';

const prefix = 'chats';

export const postCreateRooms = async (
  payload: Types.CreateRoomsPayload,
): Promise<Types.CreateRoomsEntity> => {
  const res = await apiManager.post(`${prefix}/rooms`, payload);
  return res.data;
};

export const postJoinRoom = async (
  payload: Types.JoinRoomPayload,
): Promise<Types.JoinRoomEntity> => {
  const { room_id, user_ids } = payload;
  const res = await apiManager.post(`${prefix}/rooms/${room_id}/join`, {
    user_ids,
  });
  return res.data;
};

export const postExitRoom = async (
  payload: Types.ExitRoomPayload,
): Promise<Types.ExitRoomEntity> => {
  const { room_id, user_id } = payload;
  const res = await apiManager.post(`${prefix}/rooms/${room_id}/exit`, {
    user_id,
  });
  return res.data;
};

export const postMuteRoom = async (
  payload: Types.MuteRoomPayload,
): Promise<Types.MuteRoomEntity> => {
  const { room_id, user_id } = payload;
  const res = await apiManager.post(`${prefix}/rooms/${room_id}/mute`, {
    user_id,
  });
  return res.data;
};

export const postSendMessage = async (
  payload: Types.SendMessagePayload,
): Promise<Types.SendMessageEntity> => {
  const { room_id, content } = payload;
  const res = await apiManager.post(`${prefix}/rooms/${room_id}/chat`, {
    content,
  });
  return res.data;
};

export const postReplyMessage = async (
  payload: Types.ReplyMessagePayload,
): Promise<Types.ReplyMessageEntity> => {
  const { room_id, message_id, content } = payload;
  const res = await apiManager.post(
    `${prefix}/rooms/${room_id}/messages/${message_id}/reply`,
    {
      content,
    },
  );
  return res.data;
};

export const postRemoveUser = async (
  payload: Types.RemoveUserPayload,
): Promise<Types.RemoveUserEntity> => {
  const { room_id, admin_id, remove_user_id } = payload;
  const res = await apiManager.post(`${prefix}/rooms/${room_id}/remove`, {
    admin_id,
    remove_user_id,
  });
  return res.data;
};

export const getRooms = async (
  payload: Types.RoomsPayload,
): Promise<Types.RoomsEntity> => {
  const { user_id } = payload;
  const res = await apiManager.get(`${prefix}/rooms?user_id=${user_id}`);
  return res.data;
};

export const getRoom = async (
  payload: Types.RoomPayload,
): Promise<Types.RoomEntity> => {
  const { user_id, room_id } = payload;
  const res = await apiManager.get(
    `${prefix}/rooms/${room_id}?user_id=${user_id}`,
  );
  return res.data;
};

export const getSearchRoom = async (
  payload: Types.SearchRoomPayload,
): Promise<Types.SearchRoomEntity> => {
  const { user_id, search_word } = payload;
  const res = await apiManager.get(
    `${prefix}/rooms/search?search_word=${search_word}&user_id=${user_id}`,
  );
  return res.data;
};

export const postReportRoom = async (
  payload: Types.ReportRoomPayload,
): Promise<Types.ReportRoomEntity> => {
  const res = await apiManager.post(`${prefix}/rooms/reports`, payload);
  return res.data;
};
