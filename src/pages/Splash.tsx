import { useEffect } from 'react';
import { rememberToken } from '../net/rest/api';
import { useUpdateAtom } from 'jotai/utils';
import tokenAtom from '../stores/tokenAtom';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const setToken = useUpdateAtom(tokenAtom);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      rememberToken(token);
      setToken(token);
      navigate('/chats', { replace: true });
    } else {
      navigate('/landing', { replace: true });
    }
  }, [navigate, setToken]);
  return <></>;
}
