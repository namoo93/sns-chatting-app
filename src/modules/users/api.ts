import apiManager from 'api-manager';
import * as Types from './types';

const prefix = 'auth';

export const getMyInfo = async (): Promise<Types.MyInfoEntity> => {
  const res = await apiManager.get(`${prefix}/me`);
  return res.data;
};
