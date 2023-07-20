import {Icon} from 'components/atom/images';
import NavbarLayout from 'components/layouts/NavbarLayout';
import {useNavigate} from 'react-router-dom';

function MediaMain() {
  const navigate = useNavigate();
  return (
    <NavbarLayout>
      <h1>Media</h1>
      <button onClick={() => navigate(-1)}>뒤로</button>
      <Icon size={23} src={'/images/ic_like_on_22@3x.png'} />
    </NavbarLayout>
  );
}

export default MediaMain;
