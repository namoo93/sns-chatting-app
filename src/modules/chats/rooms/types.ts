export type CreateRoomsPayload = {
  joined_user_ids: number[];
  type: 'chat';
  admin_id: number;
};

export type CreateRoomsEntity = {};

export type JoinRoomPayload = {
  room_id: string;
  user_ids: number[];
};

export type JoinRoomEntity = {};

export type ExitRoomPayload = {
  room_id: string;
  user_id: number;
};

export type ExitRoomEntity = {};

export type MuteRoomPayload = {
  room_id: string;
  user_id: number;
};

export type MuteRoomEntity = {};

export type SendMessagePayload = {
  room_id: string;
  content: string;
};

export type SendMessageEntity = {};

export type ReplyMessagePayload = {
  room_id: string;
  message_id: string;
  content: string;
};

export type ReplyMessageEntity = {};

export type RemoveUserPayload = {
  room_id: string;
  admin_id: number;
  remove_user_id: number;
};

export type RemoveUserEntity = {
  _id: string;
  admin_id: number;
  joined_users: JoinedUser[];
  joined_user_ids: number[];
  user_settings: UserSetting[];
  call: any[];
  name: string;
  type: string;
  archived_user_ids: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  is_fixed: boolean;
  unread_count: number;
  preview_message: any;
}[];

export type RoomsPayload = {
  user_id: number;
};

export type RoomsEntity = Room[];

export interface Room {
  _id: string;
  admin_id: number;
  joined_users: JoinedUser[];
  joined_user_ids: number[];
  user_settings: UserSetting[];
  call: any[];
  name: string;
  type: string;
  archived_user_ids: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  is_fixed: boolean;
  unread_count: number;
  preview_message: any;
}

export interface JoinedUser {
  id: number;
  uid: string;
  email: string;
  first_name: string;
  last_name: string;
  profileBackground: any;
  profileMessage: any;
  birth: any;
  recentlyUsedAt: any;
  videoAble: number;
  callAble: number;
  contact: string;
  officialAccount: number;
  profileImage: any;
  rememberMeToken: any;
  createdAt: string;
  updatedAt: string;
}

export interface UserSetting {
  user_id: number;
  is_fixed: boolean;
  is_muted: boolean;
  created_at?: string;
  updated_at?: string;
}

export type RoomPayload = {
  user_id: number;
  room_id: string;
};

export type RoomEntity = Room;

export type SearchRoomPayload = {
  user_id: number;
  search_word: string;
};

export type SearchRoomEntity = {};

export type ReportRoomPayload = {
  report_issue: string;
  room_id: string;
};

export type ReportRoomEntity = {};
