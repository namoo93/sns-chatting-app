import {IUser} from 'modules/users/types';

export interface IBlockData {
  id: number;
  target_id: number;
  type: string;
  create_at?: string;
  user_id: number;
}

export interface IFriendData {
  id: number;
  block: number;
  create_at?: string;
  custom_name?: string | null;
  friend_id?: number;
  is_favorite: number;
  is_mute: number;
  updated_at: string;
  user: IUser;
}

export type BlockContactPayload = {
  type: string;
  target_id: number;
};

export type BlockContactsEntity = {
  blockData: IBlockData;
  friendList: IFriendData[];
  message: string;
};

export type UnBlockContactPayload = {
  target_id: number;
};

export type UnBlockContactsEntity = {
  blockList: IBlockData[];
  message: string;
};
