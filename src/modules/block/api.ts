import apiManager from 'api-manager';
import * as Types from './types';

const prefix = 'auth';

export const postBlockContact = async (
  payload: Types.BlockContactPayload,
): Promise<Types.BlockContactsEntity> => {
  const res = await apiManager.post(`${prefix}/block`, payload);
  return res.data;
};

export const deleteUnBlockContact = async (
  payload: Types.UnBlockContactPayload,
): Promise<Types.UnBlockContactsEntity> => {
  const {target_id} = payload;
  const res = await apiManager.delete(`${prefix}/block/${target_id}`);
  return res.data;
};
