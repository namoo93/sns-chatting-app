export type ArchivesPayload = {
  user_id: number;
};

export type ArchivesEntity = ArchiveEntity[];

export type ArchivePayload = {
  user_id: number;
  room_id: string;
};

export type ArchiveEntity = {
  _id: string;
  admin_id: number;
  joined_users: any[];
  joined_user_ids: number[];
  user_settings: UserSetting[];
  call: any[];
  name: string;
  type: string;
  archived_user_ids: number[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface UserSetting {
  user_id: number;
  is_fixed: boolean;
  is_muted: boolean;
  created_at: any;
  updated_at: any;
}

export type UnArchivesPayload = {
  user_id: number;
};

export type UnArchivesEntity = {};

export type UnArchivePayload = {
  user_id: number;
  room_id: string;
};

export type UnArchiveEntity = {};
