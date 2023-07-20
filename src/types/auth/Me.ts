import User from './User';
import DateOrString from '../_common/DateOrString';

interface Setting {
  id: number;
  user_id: number;
  language: string;
  nt_preview: boolean;
  nt_group_chat: boolean;
  nt_inapp_noti: boolean;
  nt_inapp_sound: boolean;
  nt_inapp_vibrate: boolean;
  nt_disturb: boolean;
  nt_disturb_begin: DateOrString;
  nt_disturb_end: DateOrString;
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
  sc_sns_account: 'public' | 'private';
  sc_sns_post: 'public' | 'friends' | 'private';
  sc_sns_live: 'public' | 'friends' | 'private';
  sc_sns_tag: 'public' | 'friends' | 'private';
  ct_active_chat: boolean;
  ct_word_suggestion: boolean;
  ct_chat_theme: string;
  ct_background_type: string;
  ct_background: string;
  ct_text_size: number;
  created_at: DateOrString;
  updated_at: DateOrString;
  sc_voice_call: 'public' | 'friends' | 'private';
  sc_video_call: 'public' | 'friends' | 'private';
  sc_birthday: 'public' | 'friends' | 'private';
  sc_show_full_birthday: boolean;
}

export default interface Me extends User {
  setting: Setting;
}
