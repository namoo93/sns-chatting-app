import { useContext, useEffect, useState } from 'react';
import NavbarLayout from 'components/layouts/NavbarLayout';
import styled from 'styled-components';
import { Heading4 } from 'components/atom';
import { COLOR } from 'constants/COLOR';
import { ModalContext } from 'contexts/ModalContext';
import { Dialog } from 'components/molecules';
import { toast } from 'react-toastify';
import isElectron from 'is-electron';

const HeadingWrap = styled.div`
  padding: 40px 0 14px;
  text-align: center;
  border-bottom: 1px solid #eee;
`
const GrayLine = styled.div`
  height: 1px;
  background: #eee;
`;

const Wrapper = styled.button`
  text-align: left;
  position: relative;
  width: 100%;
  padding: 20px;

  strong {
    display: block;
    width: calc(100% - 80px);
    font-size: 14px;
    color: ${COLOR.BLACK};
    font-weight: normal;
    padding-bottom: 3px;
  }

  .notifications_info {
    width: calc(100% - 80px);
    font-size: 13px;
    color: #bbb;
    word-break: keep-all;
  }

  .cached_data {
    position: absolute;
    top: 20px;
    left: auto;
    right: 20px;
    font-size: 14px;
    color: ${COLOR.BLACK};
  }

  .off {
    color: #ddd;
  }
`;

const Storage = () => {
  const {openModal, closeModal} = useContext(ModalContext);
  const [disabled, setDisabled] = useState<string>('');
  const [disabledBoolean, setDisabledBoolean] = useState<boolean>(false);
  const [isCache, setIsCache] = useState<number>(0);
  
  // * Notification
  const onClickNotification = () => {
    toast('Cleared cached data successfully.', {type: 'success'});
  };
  // * Modal
  const onClickModal = () => {
    openModal(
      <Dialog 
        title={'Are you sure you want to clear cached data?'} 
        text={'Media files including Photos, Videos, and Voice messages in chatrooms will be maintained.'} 
        buttonText2={'Clear'}
        onClick={() => clearCachedData()}
      />
    );
  };

  useEffect(() => {
    if( isElectron() ) {
      const {ipcRenderer} = window.require('electron');
      ipcRenderer.send('get-cache', 'start-ipc');
      ipcRenderer.on('get-cache-end', (event, res) => {
        console.log( typeof res.size);//MB 단위로 변경
        setIsCache( Math.ceil(res.size / 1024 / 1024 *100)/100 );
        if (res.size === 0) {
          setDisabled('off');
          setDisabledBoolean(true);
        } else {
          setDisabled('');
          setDisabledBoolean(false);
        }
      });
    }
  });
 
  const onClickClearCache = () => {
    if( isElectron() ) {
      const {ipcRenderer} = window.require('electron');
      ipcRenderer.send('clear-cache', 'start-ipc');
      ipcRenderer.on('clear-cache-end', (event, res) => {
        console.log(res);
      });
    }
  };
  
  const clearCachedData = () => {
    closeModal();
    onClickNotification();
    //caches 
    onClickClearCache();
  }
  
  return (
    <NavbarLayout setting={true}>
      <HeadingWrap>
        <Heading4>Storage</Heading4>
      </HeadingWrap>

      <Wrapper onClick={() => onClickModal()} disabled={disabledBoolean}>
        <strong className={disabled}>Clear Cached Data</strong>
        <p className={`notifications_info ${disabled}`}>
          Cached data is temporary data generated when using Kok Kok.
          It doesn’t include media files shared in chatrooms.
        </p>
        
        <span className={`cached_data  ${disabled}`}>
          {isCache} MB
        </span>
      </Wrapper>
      <GrayLine />
    </NavbarLayout>
  );
}

export default Storage;
