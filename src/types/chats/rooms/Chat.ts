import User from 'types/User';
import Rooms from './Rooms';

type EmotionType = 'heart' | 'thumbUp' | 'smile' | 'surprise' | 'sad' | 'angry';

export interface IEmotion {
  user_id: string;
  emotion: EmotionType;
}
interface Chat {
  room_id: string;
  room: Rooms;
  sender_id: number;
  unread_count: number;
  type: string;
  content: string;
  emotions: IEmotion[];
  read_user_ids: number[];
  pin_read_user_ids: number[]; //TODO: 데이터 타입 확인필요
  deleted_from_user_ids: number[]; //TODO: 데이터 타입 확인필요
  has_link: boolean;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  user: User;
}

export default Chat;
