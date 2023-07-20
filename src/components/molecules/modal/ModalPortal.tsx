import {createPortal} from 'react-dom';
import {usePortal} from 'hooks';

const ModalPortal: React.FC = ({children}) => {
  const target = usePortal('modal');
  return target ? createPortal(children, target) : <></>;
};

export default ModalPortal;
