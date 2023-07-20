import MetaResponse from '../../common/MetaResponse';
import FollowerItem from './FollowerItem';

export default interface FollowerResponse {
  items: FollowerItem[];
  meta: MetaResponse;
}
