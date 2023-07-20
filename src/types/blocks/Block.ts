import User from '../auth/User';

interface Freind {
  id: number;
  user_id: number;
  friend_id: number;
  block: number;
  custom_name?: string;
  is_favorite: number;
  is_mute: number;
  created_at: Date;
  updated_at: Date;
  user: User;
}

interface Block {
  blockData: {
    id: number;
    user_id: number;
    target_id: number;
    type?: string;
    created_at: Date;
    updated_at: Date;
  };
  friendList: Freind[];
  message: string;
}

export default Block;
