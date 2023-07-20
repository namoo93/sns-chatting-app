import { IUser } from 'modules/users/types';

export interface IContact {
  id: number;
  block: number;
  create_at?: string;
  custom_name?: string | null;
  friend_id?: number;
  is_favorite: number;
  is_mute: number;
  updated_at: string;
  friend: IUser;
}

export type ContactsEntity = IContact[];

export type AddContactsPayload = {
  contacts: { number?: string }[];
};

export type PatchFavoriteOrMutePayload = {
  friend_id?: number;
  is_mute?: number;
  is_favorite?: number;
};
