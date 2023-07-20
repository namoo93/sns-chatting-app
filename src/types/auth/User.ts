interface User {
  id: number;
  uid: string;
  email?: string;
  contact: string;
  first_name: string;
  last_name: string;
  profile_message: string;
  profile_image: string;
  profile_background: string;
  birth: string;
  recently_used_at?: string;
  video_able: boolean;
  call_able: boolean;
  remember_me_token?: string;
  official_account: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_reason?: string;
  deleted_at?: Date;
}

export default User;
