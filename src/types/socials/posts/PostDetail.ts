import User from '../../User';
import TaggedUserIds from './TaggedUserIds';
import Posts from './Posts';

interface PostDetail {
  _id: string;
  user_id: number;
  // favorite?: string; //TODO: 데이터 타입 확인필요
  taged_user_ids: TaggedUserIds[];
  contents: string;
  live_watching_user?: number;
  image: string[];
  hashtag: string[];
  video?: string;
  location: string;
  shared_post: Posts[];
  shared_post_id?: string;
  type: string;
  is_hidden_users: number[];
  status?: string;
  created_At: Date;
  updated_At: Date;
  deleted_at?: Date;
  __v: boolean;
  user: User;
}

export default PostDetail;
