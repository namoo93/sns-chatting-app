import User from '../../auth/User';

interface Comments {
  post_id: string;
  user_id: number;
  contents: string;
  depth: number;
  group: number;
  group_order: number;
  is_hidden_users: number[];
  created_at: Date;
  deleted_at?: Date;
  _id: string;
  __v: boolean;
  user: User;
}

export default Comments;
