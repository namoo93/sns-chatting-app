import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Icon, IconButton } from 'components/atom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { COLOR } from 'constants/COLOR';
import { newFixedSizeWindowOptions, newFixedSizeWindowOptions_1024 } from 'constants/CONST';
import { ModalContext } from 'contexts';
import { toast } from 'react-toastify';
import { Dialog, IconModal, SelectModal } from 'components/molecules';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 37px 20px 15px 20px;
  border-bottom: 1px solid #f8f8f8;

  div {
    display: flex;
    align-items: center;
  }

  .title {
    button {
      margin-right: 4px;
    }
    p {
      font-size: 18px;
      font-weight: bold;
      color: ${COLOR.BLACK};
    }
  }

  .btn_wrap {
    button {
      margin-left: 15px;
    }
  }
`;

const TimelineHeader = ({ user, myTimeline }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [newNotice] = useState(true);
  const { openModal, closeModal } = useContext(ModalContext);
  const [reportReason, setReportReason] = useState('');
  const [reportReasonReport, setReportReasonReport] = useState('');

  const openActivity = () => {
    window.open('/kokkokme/user-timeline/activity', 'Activity', newFixedSizeWindowOptions);
  };

  const openSelectListReport = useCallback(() => {
    const reportModalPropsReport = {
      title: `${t('sns.Please select a reason for reporting')}`,
      onClickOption: (value) => {
        setReportReasonReport(value);
      },
      options: [
        `${t('sns.Spam')}`,
        `${t('sns.Nude images or sexual acts')}`,
        `${t('sns.I dont like it')}`,
        `${t('sns.Fraudulent or false')}`,
        `${t('sns.Hate speech or symbol')}`,
        `${t('sns.False information')}`,
      ],
    };

    openModal(<SelectModal {...reportModalPropsReport} closeModal={closeModal} />);
  }, [closeModal, openModal]);

  useEffect(() => {
    if (reportReason === 'Copy profile link') {
      closeModal();
      toast(`${t('sns.Link Copied')}`, { type: 'success' });
      setReportReason('');
    }
    if (reportReason === 'Block this user') {
      openModal(
        <Dialog
          buttonText1={`${t('button-common.Cancel')}`}
          buttonText2={`${t('button-common.Block')}`}
          title=""
          // eslint-disable-next-line no-template-curly-in-string
          ///Todo_lang (누락)
          text={`${t(
            'sns.Are you sure you want to block the ${user.}?Once you block, you cant see each others posts and cant chat with each other.',
          )}`}
          onClick={() => {
            toast(`${user?.uid} ${t('sns.blocked')}`, { type: 'success' });
            closeModal();
          }}
        />,
      );
      setReportReason('');
    }
    if (reportReason === 'Report') {
      openSelectListReport();
      setReportReason('');
    }

    if (reportReasonReport !== '') {
      toast(`${t('sns.Report has been received')}`, { type: 'success' });
      setReportReasonReport('');
      closeModal();
    }
  }, [closeModal, openModal, openSelectListReport, reportReason, reportReasonReport, user?.uid]);

  const openSelectList = () => {
    const reportModalProps = {
      title: '',
      onClickOption: (value) => {
        setReportReason(value);
      }, //Todo_lang (누락) Block this user
      options: [`${t('sns.Copy Link')}`, `${t('sns.Block this user')}`, `${t('sns.Report')}`],
    };

    openModal(<SelectModal {...reportModalProps} closeModal={closeModal} />);
  };

  const openModalNewPost = () => {
    const snsOptions = [
      { imgSrc: '/images/new_post.svg', size: 28, name: 'New Post' },
      // { imgSrc: '/images/new_live.svg', size: 28, name: 'Start Live' },
    ];
    const openPages = (value) => {
      if (value === 'New Post') {
        window.open('/kokkokme/kokkokme-post', 'KokKokMePost', newFixedSizeWindowOptions_1024);
        closeModal();
      }
      // if (value === 'Start Live') {
      //   console.log('not');
      //   closeModal();
      // }
    };

    openModal(
      <IconModal
        rightTitle={'New'}
        topMenuIcon={false}
        options={snsOptions}
        onClickOption={(value) => openPages(value)}
        closeModal={closeModal}
        width={'90px'}
      />,
    );
  };

  return (
    <Container>
      <div className="title">
        <button>
          <Icon size={22} src={'/images/icon/ic-prev-22.png'} onClick={() => navigate(-1)} />
        </button>
        <p>{user?.first_name + ' ' + user?.last_name}</p>
      </div>
      {myTimeline ? (
        <div className="btn_wrap">
          <IconButton
            iconWidth={22}
            iconHeight={22}
            iconName={'ic-write-22'}
            iconOnly
            onClick={() => openModalNewPost()}
          />
          {newNotice ? (
            <IconButton
              iconWidth={22}
              iconHeight={22}
              iconName={'ic-notice-22'}
              iconOnly
              onClick={() => openActivity()}
            />
          ) : (
            <IconButton
              iconWidth={22}
              iconHeight={22}
              iconName={'ic-notice-on-22'}
              iconOnly
              onClick={() => openActivity()}
            />
          )}
        </div>
      ) : (
        <div className="btn_wrap">
          <IconButton iconWidth={22} iconHeight={22} iconName={'ic-chat-add-22'} iconOnly onClick={() => {}} />
          <IconButton
            iconWidth={16}
            iconHeight={16}
            iconName={'ic-more-16'}
            iconOnly
            onClick={() => openSelectList()}
          />
        </div>
      )}
    </Container>
  );
};

export default TimelineHeader;
