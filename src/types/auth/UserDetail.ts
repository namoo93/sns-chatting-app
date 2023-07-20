import User from './User';

interface Friend {
  id: number;
  user_id: number;
  friend_id: number;
  block: number;
  custom_name?: string;
  is_favorite: number;
  is_mute: number;
  created_at: string;
  updated_at: string;
}

interface Following {
  id: number;
  user_id: number;
  follower_id: number;
  status: string;
  hidden: number;
  created_at?: string;
  updated_at?: string;
}

interface Follower {
  id: number;
  user_id: number;
  follower_id: number;
  status: string;
  hidden: number;
  created_at?: string;
  updated_at?: string;
}

export default interface UserDetail extends User {
  friend: Friend;
  following: Following;
  follower: Follower;
  block?: number;
}
