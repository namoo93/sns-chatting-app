export default interface CertificationPayload {
  contact: string;
  code: string;
  device_id: string;
  device_name: string;
  mode?: string;
  push_token?: string;
}
