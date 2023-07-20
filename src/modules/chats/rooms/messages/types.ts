export type MessagesPayload = {
  room_id: string;
  page?: number;
  limit?: number;
  type?: 'all';
};

export type MessagesEntity = {
  docs: MessageEntity[];
  totalPages: number;
};

export type MessagePayload = {
  room_id: string;
  message_id: string;
};

export type MessageEntity = {
  _id: string;
  room_id: string;
  room: string;
  sender_id: number;
  unread_count: number;
  type: string;
  content: string;
  emotions: any[];
  read_user_ids: number[];
  deleted_from_user_ids: any[];
  has_link: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  user: User;
};

export interface User {
  id: number;
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
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

export type SearchMessagePayload = {
  room_id: string;
  search_word: string;
};

export type SearchMessageEntity = {};
