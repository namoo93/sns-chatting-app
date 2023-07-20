import User from '../../User';

interface user_setting {
  user_id: number;
  is_fixed: boolean;
  is_muted: boolean;
  last_seen_time?: Date; //TODO: 데이터 타입확인필요
  created_at: Date;
  updated_at: Date;
}
interface Rooms {
  admin_id: number;
  joined_users: User[];
  joined_user_ids: number[];
  user_settings: user_setting[];
  call: string[]; //TODO: 데이터 타입확인필요
  name: string;
  type: string;
  archived_user_ids: string[];
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: boolean;
}

export default Rooms;
