import User from './User';
import Token from './Token';

interface SignUpResponse {
  user: User;
  token: Token;
}

export default SignUpResponse;
