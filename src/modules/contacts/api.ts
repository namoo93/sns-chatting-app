import apiManager from 'api-manager';
import * as Types from './types';

const prefix = 'auth';

export const getContacts = async (): Promise<Types.ContactsEntity> => {
  const res = await apiManager.get(`${prefix}/contacts`);
  return res.data;
};
