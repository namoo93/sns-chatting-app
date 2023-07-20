import User from '../../User';
import Comments from './Comments';
interface CommentsDetail extends Comments {
  user_info: User;
}

export default CommentsDetail;
