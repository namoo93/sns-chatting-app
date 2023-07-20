import User from 'types/auth/User';
import DateOrString from 'types/_common/DateOrString';
import Nullable from 'types/_common/Nullable';
import Call from '../calls/Call';
import MessageWithDoc from './messages/Message';

export type RoomTypeOfServer = 'chat' | 'group' | 'me' | 'wallet'; //서버의 RoomType
export type RoomTypeOfClient = 'chat' | CallType; //클라이언트의 RoomType
export type CallType = 'audio' | 'video'; //클라이언트의 RoomType

export interface IUserSetting {
  user_id: number;
  is_muted: boolean; // 음소거 여부
  is_fixed: boolean; // 상단 고정 여부
  order?: string; // 고정 시 순서
  last_seen_time?: DateOrString;
  created_at: String;
  updated_at: String;
}

interface Room {
  _id: string;
  admin_id: number;
  joined_users: User[];
  joined_user_ids: number[];
  user_settings: IUserSetting[];
  call: Call[];
  name: string;
  type: RoomTypeOfServer;
  is_fixed: boolean;
  unread_count: number;
  archived_user_ids: number[];
  messages: MessageWithDoc[];
  fixed_msg: Nullable<MessageWithDoc>;
  preview_message?: MessageWithDoc;
  createdAt?: DateOrString;
  updatedAt?: DateOrString;
}

export type OnRoomsType = {
  unArchivedRooms: Room[];
  archivedRooms: Room[];
};
export default Room;
