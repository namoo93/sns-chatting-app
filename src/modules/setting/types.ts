export type OfficialAccountPayload = {};

export type ThemePayload = {
  ct_chat_theme: 'system' | 'dark' | 'light';
  ct_background_type: 'color';
  ct_background: string;
  ct_text_size: string;
};

export type ChatPayload = {
  ct_active_chat: number;
  ct_word_suggestion: number;
};

export type NotificationPayload = {
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
  nt_sns_live_target: 'everybody' | 'contacts';
  nt_sns_live_invitation: boolean;
};

export type DisclosurePayload = {
  sc_recent_login: 'public' | 'friends' | 'private';
  sc_profile_photo: 'public' | 'friends' | 'private';
  sc_group_call: 'public' | 'friends' | 'private';
  sc_passcode_auth: number;
  sc_sns_timeline: 'public' | 'friends' | 'private';
  sc_birthday_bound: number;
  sc_biometric_auth: number;
  sc_add_automatically: number;
};
