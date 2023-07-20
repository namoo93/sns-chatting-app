import MetaResponse from '../../common/MetaResponse';
import FollowingItem from './FollowingItem';

export default interface FollowingResponse {
  items: FollowingItem[];
  meta: MetaResponse;
}
