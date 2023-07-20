import apiManager from 'api-manager';
import * as Types from './types';

const prefix = '/auth';

export const getUser = async (): Promise<Types.UserEntity> => {
  const res = await apiManager.get(`${prefix}/me`);
  return res.data;
};

export const postDuplicateEmail = (payload: Types.DuplicateEmailPayload) => {
  apiManager.post(`${prefix}/duplicate-email`, payload);
};
