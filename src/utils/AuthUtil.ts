import { get, post, rememberToken, removeToken } from 'net/rest/api';
import Certification from 'types/auth/Certification';
import CertificationPayload from 'types/auth/CertificationPayload';
import Me from 'types/auth/Me';
import Nullable from 'types/_common/Nullable';
import LogUtil from './LogUtil';
import { v4 as uuid } from 'uuid';

class AuthUtil {
  static user: Me;

  static logout() {
    try {
      removeToken();
    } catch (error: any) {
      console.warn(error);
    }
  }
  static async loginWithTest(): Promise<Certification | undefined> {
    const certification = await post<Certification, CertificationPayload>(
      '/pub/auth/certification',
      {
        contact: '+821012345678',
        code: '646384',
        mode: 'dev',
        device_name: navigator.userAgent,
        device_id: uuid().toString(),
        push_token: '-',
      },
      null,
      (error) => {
        console.log(`loginWithTest error : ${JSON.stringify(error)}`);
      },
    );

    if (certification) {
      rememberToken(certification.token.token);
    }

    return certification;
  }

  static async getMe(): Promise<Me | undefined> {
    const user = await get<Me>('/auth/me', null, (error) => {
      console.warn(error);
    });
    if (user) {
      AuthUtil.user = user;
    }

    return user;
  }

  static getUserId(): Nullable<number> {
    const userId = AuthUtil.user?.id;
    LogUtil.info('AuthUtil getUserId', userId);
    return userId;
  }
  static getUserName(): string {
    return `${AuthUtil.user?.first_name ?? ''} ${AuthUtil.user?.last_name ?? ''}`;
  }
  static getProfileImageUrl(): Nullable<string> {
    return AuthUtil.user?.profile_image;
  }
}

export default AuthUtil;
