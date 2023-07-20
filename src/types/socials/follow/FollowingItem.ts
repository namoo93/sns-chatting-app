export default interface FollowingItem {
  id: number;
  user_id: number;
  follower_id: number;
  status: string;
  hidden: number;
  connected?: number;
  created_at?: string;
  updated_at?: string;
  following: {
    id: number;
    uid: string;
    email?: string;
    first_name: string;
    last_name: string;
    profile_background?: string;
    profile_message?: string;
    birth?: string;
    recently_used_at?: string;
    video_able: number;
    call_able: number;
    contact: string;
    official_account: number;
    profile_image?: string;
    remember_me_token?: string;
    created_at: string;
    updated_at: string;
  };
}
