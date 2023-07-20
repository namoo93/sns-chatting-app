import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Avatar, Icon } from 'components/atom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ModalContext } from 'contexts/ModalContext';
import { Dialog, IconModal, SelectModal } from 'components/molecules';
import { toast } from 'react-toastify';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ProfileWrap = styled.div`
  width: calc(100% - 65px);
  cursor: pointer;
  display: flex;
  align-items: center;

  .profile_title {
    margin-left: 10px;
    width: calc(100% - 60px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 15px;
    font-weight: 500;
    color: #262525;
  }
  .profile_sub {
    font-size: 11px;
    color: #bbb;
    line-height: 1;
    padding-top: 4px;
  }
  button {
    display: block;
  }
`;

const PostHeader = ({ user, created_at }) => {
  const { t } = useTranslation();
  const [dateStr, setDateStr] = useState('');
  const { openModal, closeModal } = useContext(ModalContext);
  const [reportReason, setReportReason] = useState('');

  const openIconModal = useCallback(() => {
    const snsOptions = [
      { imgSrc: '/images/modal_menu.png', size: 42, name: 'Kokkok' },
      { imgSrc: '/images/modal_menu.png', size: 42, name: 'Whatsapp' },
      { imgSrc: '/images/modal_menu.png', size: 42, name: 'Zalo' },
      { imgSrc: '/images/modal_menu.png', size: 42, name: 'Kakao talk' },
      { imgSrc: '/images/modal_menu.png', size: 42, name: 'Facebook Messanger' },
      { imgSrc: '/images/modal_menu.png', size: 42, name: 'Text Messages' },
      { imgSrc: '/images/modal_menu.png', size: 42, name: 'Facebook' },
      { imgSrc: '/images/modal_menu.png', size: 42, name: 'Instagram' },
    ];

    openModal(
      <IconModal
        topMenuIcon={true}
        closeModal={closeModal}
        options={snsOptions}
        URLString={'dsda'}
        onClickOption={() => {}}
        width={'330px'}
      />,
    );
  }, [closeModal, openModal]);

  useEffect(() => {
    if (reportReason === 'Delete') {
      openModal(
        <Dialog
          buttonText1={`${t('button-common.Cancel')}`}
          buttonText2={`${t('button-common.Delete')}`}
          title={`${t('sns.Are you sure you want to delete the article?')}`}
          text={`${t('sns.If you delete it, all applied contents will be deleted')}`}
          onClick={() => {}}
        />,
      );
      setReportReason('');
    }
    if (reportReason === 'Copy link') {
      closeModal();
      toast(`${t('sns.Link Copied')}`, { type: 'success' });
      setReportReason('');
    }
    if (reportReason === 'Share') {
      openIconModal();
      setReportReason('');
    }
  }, [closeModal, openIconModal, openModal, reportReason]);

  useEffect(() => {
    setDateStr(created_at);
  }, [created_at, dateStr]);

  const navigate = useNavigate();
  const goToTimeline = (user_id) => {
    const userId = user_id.toString();
    const userInfo = `${userId}&${user.uid}`;
    navigate(`/kokkokme/user-timeline/${userInfo}`);
  };

  const openSelectList = () => {
    const reportModalProps = {
      title: '',
      onClickOption: (value) => {
        setReportReason(value);
      },
      options: [
        `${t('button-common.Edit')}`,
        `${t('button-common.Delete')}`,
        `${t('sns.Copy link')}`,
        `${t('sns.Share')}`,
      ],
    };

    openModal(<SelectModal {...reportModalProps} closeModal={closeModal} />);
  };

  const postTime = DateTime.fromISO(dateStr).toLocaleString(DateTime.DATETIME_MED);

  return (
    <Container>
      <ProfileWrap onClick={() => goToTimeline(user?.id)}>
        <Avatar size={40} src={user?.profile_image} />
        <p className="profile_title">
          {user?.first_name + ' ' + user?.last_name}
          <p className="profile_sub">{postTime}</p>
        </p>
      </ProfileWrap>

      <button onClick={() => openSelectList()}>
        <Icon size={16} src={'/images/icon/ic-more-16.svg'} />
      </button>
    </Container>
  );
};

export default PostHeader;
