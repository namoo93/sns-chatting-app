interface ContactInfo {
  id: number;
  uid: string;
  email?: string;
  contact: string;
  first_name: string;
  last_name: string;
  profile_message?: string;
  profile_image?: string;
  profile_background?: string;
  birth?: string;
  recently_used_at?: string;
  video_able: boolean;
  call_able: boolean;
  remember_me_token?: string;
  official_account: boolean;
  created_at: Date;
  updated_at: Date;
  contact_setting: {
    id: number;
    user_id: number;
    friend_id: number;
    block: boolean;
    custom_name?: string;
    is_favorite: boolean;
    is_mute: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}

export default ContactInfo;
