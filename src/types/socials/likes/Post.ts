import User from 'types/User';
import PostDetail from '../posts/PostDetail';
import TaggedUserIds from '../posts/TaggedUserIds';

interface Post {
  _id: string;
  user_id: number;
  taged_user_ids: TaggedUserIds[];
  contents: string;
  image: string[];
  video: string;
  shared_post?: PostDetail;
  shared_post_id: string;
  type: string;
  is_hidden_users: number[];
  status: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  __v: boolean;
  is_like: boolean;
  likecount: number;
  commentcount: number;
  user: User;
}

export default Post;
