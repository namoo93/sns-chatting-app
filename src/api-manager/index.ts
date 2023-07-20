import Ajax from './ajax';
import {getToken} from 'lib/token';

class ResourceService extends Ajax {
  public constructor(link: string) {
    super({
      headerAuthorization: () => {
        if (getToken()) {
          return `Bearer ${getToken()}`;
        }
        return '';
      },
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },

      baseURL: link,
    });
  }
}

const link = `${process.env.REACT_APP_API_HOST}`;

const service = new ResourceService(link);

export default service;
