// import { IMessage } from 'react-native-gifted-chat/lib/GiftedChat';
import DateOrString from 'types/_common/DateOrString';
import Nullable from 'types/_common/Nullable';
import Room from '../Room';
import User from '../../../auth/User';

export type MessageType = 'message' | 'file' | 'image' | 'video' | 'system';
export type EmotionType = 'heart' | 'thumbUp' | 'smile' | 'surprise' | 'sad' | 'angry';

export interface IEmotion {
  user_id: string;
  emotion: EmotionType;
}

declare type renderFunction = (x: any) => JSX.Element;

interface MessageUser {
  _id: string | number;
  name?: string;
  avatar?: string | number | renderFunction;
}

interface Message {
  _id: string; //메시지 id
  room_id: string;
  room: Room;
  sender_id: number;
  unread_count: number;
  type: MessageType;
  content: string;
  emotions: IEmotion[];
  read_user_ids: number[];
  pin_read_user_ids?: number[];
  pin_is_read: boolean;
  deleted_from_user_ids: number[];
  next_msg_id?: string;
  prev_msg_id?: string;
  reply_parent_message_id?: string;
  reply_parent_message?: Message;
  is_read: boolean;
  has_link: boolean;
  user: User;
  createdAt: DateOrString;
  updatedAt: DateOrString;
}

export interface KokKokIMessage {
  // react-native-gifted-chat
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: MessageUser;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
  // quickReplies?: QuickReplies;

  // kokkok i message
  unread_count?: number;
  type: MessageType;
  original_message_by_server?: Message;
  reply_message?: KokKokIMessage;
}

export interface KokKokIMessageDocs {
  kokKokIMessages: KokKokIMessage[];
  messageDocs: MessageDocs;
}

export type MessageDocs = { docs: Message[]; not_exist_friend?: boolean; room: Room };

export default Message;
