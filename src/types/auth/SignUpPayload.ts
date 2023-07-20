export default interface SignUpPayload {
  first_name: string;
  last_name: string;
  uid: string;
  profile_image: string;
  contact: string;
  device_id: string;
  device_name: string;
  push_token: string;
  mode?: string;
}
