export type SaveMessagePayload = {
  room_id: string;
  message_id: string;
};

export type SaveMessageEntity = {};

export type UnSaveMessagePayload = {
  room_id: string;
  message_id: string;
};

export type UnSaveMessageEntity = {};

export type SavedMessagesPayload = {
  user_id: number;
};

export type SavedMessagesEntity = {};
