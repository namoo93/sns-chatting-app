import Rooms from '../Rooms';

type MessageType = 'message' | 'file' | 'image' | 'video' | 'system';
type EmotionType = 'heart' | 'thumbUp' | 'smile' | 'surprise' | 'sad' | 'angry';

export interface IEmotion {
  user_id: string;
  emotion: EmotionType;
}

interface Doc {
  _id: string;
  room_id: string;
  room: string;
  type: MessageType;
  content: string;
  emotions: Array<IEmotion>;
  read_user_ids: string[]; //TODO:데이터 타입 확인필요
  pin_read_user_ids: string[]; //TODO:데이터 타입 확인필요
  deleted_from_user_ids: string[]; //TODO:데이터 타입 확인필요
  has_link: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: boolean;
  user: {
    id: number;
    uid: string;
    email?: string;
    contact: string;
    first_name: string;
    last_name: string;
    profile_message: string;
    profile_image: string;
    profile_background: string;
    birth: Date;
    recently_used_at?: Date;
    video_able: boolean;
    call_able: boolean;
    remember_me_token?: string;
    official_account: boolean;
    created_at: Date;
    updated_at: Date;
    is_friend: boolean;
  };
}

interface Messages {
  docs: Doc[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: string; //TODO: 데이터 타입확인필요
  nextPage?: string; //TODO: 데이터 타입확인필요
  room: Rooms;
  not_exist_friend: boolean;
}

export default Messages;
