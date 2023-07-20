import TaggedUserIds from './TaggedUserIds';

interface Posts {
  user_id: number;
  favorite?: string; //TODO: 데이터 타입확인필요
  taged_user_ids: TaggedUserIds[];
  contents: string;
  live_watching_user: number;
  image: string[];
  hashtag: string[];
  video?: string;
  location: string;
  shared_post: Posts[];
  shared_post_id?: string; //TODO: 데이터 타입확인필요
  type: string;
  is_hidden_users: number[];
  status: string;
  created_At: Date;
  updated_At: Date;
  deleted_at?: Date;
  _id: string;
  __v: boolean;
}

export default Posts;
