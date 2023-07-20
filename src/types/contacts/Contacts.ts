interface Contact {
  id: number;
  user_id: number;
  friend_id: number;
  block: boolean;
  custom_name: string;
  is_favorite: boolean;
  is_mute: boolean;
  created_at: Date;
  updated_at: Date;
  friend: {
    id: number;
    uid: string;
    email: string;
    contact: string;
    first_name: string;
    last_name: string;
    profile_message?: string;
    profile_image?: string;
    profile_background?: string;
    birth?: string;
    recently_used_at?: string;
    video_able: number;
    call_able: number;
    remember_me_token?: string;
    official_account: number;
    created_at: Date;
    updated_at: Date;
    deleted_reason?: string;
    deleted_at?: Date;
  };
}

interface Contacts extends Array<Contact> {}

export default Contacts;
