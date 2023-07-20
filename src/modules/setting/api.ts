import apiManager from 'api-manager';
import * as Types from './types';

const apiUrl = '/user-setting';

export const postOfficialAccount = () => {
  apiManager.post('/officialAccount');
};

export const patchTheme = (payload: Types.ThemePayload) => {
  apiManager.patch(`${apiUrl}`, payload);
};

export const patchChat = (payload: Types.ThemePayload) => {
  apiManager.patch(`${apiUrl}`, payload);
};

export const patchNotification = (payload: Types.NotificationPayload) => {
  apiManager.patch(`${apiUrl}`, payload);
};

export const patchDisclosure = (payload: Types.NotificationPayload) => {
  apiManager.patch(`${apiUrl}`, payload);
};
