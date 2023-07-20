interface UserSetting {
  id: number;
  user_id: number;
  language: string;
  nt_preview: boolean;
  nt_group_chat: boolean;
  nt_inapp_noti: boolean;
  nt_inapp_sound: boolean;
  nt_inapp_vibrate: boolean;
  nt_disturb: boolean;
  nt_disturb_begin: Date;
  nt_disturb_end: Date;
  nt_market: boolean;
  nt_email: boolean;
  nt_sns_likes: boolean;
  nt_sns_comment: boolean;
  nt_sns_tag: boolean;
  nt_sns_followers: boolean;
  nt_sns_live: boolean;
  nt_sns_live_target: string;
  nt_sns_live_invitation: boolean;
  sc_recent_login: 'public' | 'friends' | 'private';
  sc_profile_photo: 'public' | 'friends' | 'private';
  sc_group_call: 'public' | 'friends' | 'private';
  sc_passcode_auth: boolean;
  sc_birthday_bound: boolean;
  sc_add_automatically: boolean;
  sc_biometric_auth: boolean;
  ct_active_chat: boolean;
  ct_word_suggestion: boolean;
  ct_chat_theme: string;
  ct_background_type: string;
  ct_background: string;
  ct_text_size: number;
  created_at: Date;
  updated_at: Date;
}

interface UserSettings extends Array<UserSetting> {}

export default UserSettings;
