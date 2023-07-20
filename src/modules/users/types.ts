export interface IUser {
  id: number;
  uid: string;
  birth?: string | null;
  contact: string;
  created_at: string;
  updated_at: string;
  email?: string | null;
  first_name: string;
  last_name: string;
  profile_message?: string;
  profile_image?: string;
  profile_background?: string;
  recently_used_at: string;
  remember_me_token?: string;
  official_account: number;
  video_able: number;
  call_able: number;
}

export interface IUserSetting {
  id: number;
  user_id: number;
  language: string;
  nt_preview: number;
  nt_group_chat: number;
  nt_inapp_noti: number;
  nt_inapp_sound: number;
  nt_inapp_vibrate: number;
  nt_disturb: number;
  nt_disturb_begin: string;
  nt_disturb_end: string;
  nt_market: number;
  nt_email: number;
  nt_sns_likes: number;
  nt_sns_comment: number;
  nt_sns_tag: number;
  nt_sns_followers: number;
  nt_sns_live: number;
  nt_sns_live_target: string;
  nt_sns_live_invitation: number;
  sc_recent_login: string;
  sc_profile_photo: string;
  sc_group_call: string;
  sc_passcode_auth: number;
  sc_birthday_bound: number;
  sc_add_automatically: number;
  sc_biometric_auth: number;
  ct_active_chat: number;
  ct_word_suggestion: number;
  ct_chat_theme: string | number;
  ct_background_type: string | number;
  ct_background: string | number;
  ct_text_size: number;
  created_at: string;
  updated_at: string;
}

export interface IMyInfo extends IUser {
  setting: IUserSetting;
}

export type MyInfoEntity = IMyInfo;
