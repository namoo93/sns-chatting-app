import S3 from 'react-aws-s3';
import {v4 as uuidv4} from 'uuid';

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
};
(window as any).global = window;
// @ts-ignore
window.Buffer = window.Buffer || require('buffer').Buffer;

export const uploadS3 = async file => {
  const newFileName = uuidv4();
  const ReactS3Client = new S3(config);

  return await ReactS3Client.uploadFile(file, newFileName);
};
