import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { ModalContext } from 'contexts';
import { Column } from 'components/layouts';
import { RoomDetailNavItem } from '../molecules';
import { ReactComponent as Media } from 'assets/chats/ic_media.svg';
import { ReactComponent as File } from 'assets/chats/ic_file.svg';
import { ReactComponent as Link } from 'assets/chats/ic_link.svg';
import { ReactComponent as Report } from 'assets/chats/ic_report.svg';
import { SelectModal, Dialog } from 'components/molecules';
import { useTranslation } from 'react-i18next';

type Props = { handleReport: (reportReason: string, checked: boolean) => void };

const Wrapper = styled(Column)`
  width: 100%;
`;

export default function RoomDetailNavList({ handleReport }: Props) {
  const { t } = useTranslation();
  const [reportReason, setReportReason] = useState('');
  const { openModal, closeModal } = useContext(ModalContext);

  useEffect(() => {
    if (reportReason) {
      openModal(
        <Dialog
          buttonText1={`${t('button-common.Cancel')}`}
          buttonText2={`${t('button-common.Confirm')}`}
          title={`${t('chats.Report this group?')}`}
          text={`${t('chats.People in this chatroom will not be notified with your report')}`}
          checkedOptionLabel={`${t('chats.Block user and delete all conversation')}`}
          onClick={(checked) => {
            if (typeof checked === 'boolean') {
              handleReport(reportReason, checked);
              closeModal();
            }
          }}
        />,
      );
    }
  }, [closeModal, handleReport, openModal, reportReason]);
  const navs = [
    {
      title: `${t('chats.Media')}`,
      icon: <Media />,
      path: '/chats/1/media',
      onClick: () => {
        window.open('/chats/1/media', '', 'width=685,height=605');
      },
    },
    {
      title: `${t('chats.Files')}`,
      icon: <File />,
      path: '/chats/1/files',
    },
    {
      title: `${t('chats.Links')}`,
      icon: <Link />,
      path: '/chats/1/links',
    },
    {
      title: `${t('chats.Report')}`,
      icon: <Report />,
      path: '/chats/1/report',
      onClick: () => {
        const reportModalProps = {
          title: `${t('chats.Please set a reason for reporting')}`,
          onClickOption: (value) => {
            setReportReason(value);
          },
          options: [
            `${t('chats.Spam')}`,
            `${t('chats.Nude images or sexual acts')}`,
            `${t('chats.I dont like it')}`,
            `${t('chats.Hate speech or symbol')}`,
            `${t('chats.False information')}`,
          ],
        };

        openModal(<SelectModal {...reportModalProps} closeModal={closeModal} />);
      },
    },
  ];
  return (
    <Wrapper>
      {navs.map((nav, i) => {
        return <RoomDetailNavItem {...nav} key={i} />;
      })}
    </Wrapper>
  );
}
