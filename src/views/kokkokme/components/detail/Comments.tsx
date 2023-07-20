import { Avatar, IconTypeButton } from 'components/atom';
import { SelectModal } from 'components/molecules';
import { COLOR } from 'constants/COLOR';
import { MAX_WIDTH, MIN_WIDTH } from 'constants/WIDTH';
import { ModalContext } from 'contexts';
import { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import CommentsType from '../../../../types/socials/comments/Comments';
import { useAtomValue } from 'jotai';
import userAtom from '../../../../stores/userAtom';
import { post as postAction, remove } from '../../../../net/rest/api';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';

interface CommentItemProps {
  comment: CommentsType;
  mutate: () => void;
}

function CommentItem({ comment, mutate }: CommentItemProps) {
  const { t } = useTranslation();
  const [dateStr, setDateStr] = useState('');
  const { openModal, closeModal } = useContext(ModalContext);
  const [reportReason, setReportReason] = useState('');
  const [reportReasonReport, setReportReasonReport] = useState('');
  const me = useAtomValue(userAtom);
  // 대댓글 입력
  const [isReplyOpen, setReplyOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');

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
        `${t('sns.fraudulent or false')}`,
        `${t('sns.Hate speech or symbol')}`,
        `${t('sns.False information')}`,
      ],
    };

    openModal(<SelectModal {...reportModalPropsReport} closeModal={closeModal} />);
  }, [closeModal, openModal]);

  useEffect(() => {
    if (reportReason === 'Hide this comment') {
      setReportReason('');
      closeModal();
    }
    if (reportReason === 'Hide all activities') {
      setReportReason('');
      closeModal();
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
  }, [closeModal, openSelectListReport, reportReason, reportReasonReport]);

  const openSelectList = () => {
    const reportModalProps = {
      title: '',
      onClickOption: (value) => {
        setReportReason(value);
      },
      options: ['Hide this comment', 'Hide all activities', 'Report'],
    };

    openModal(<SelectModal {...reportModalProps} closeModal={closeModal} />);
  };

  useEffect(() => {
    setDateStr(comment.created_at.toString());
  }, [comment.created_at, dateStr]);

  const postTime = DateTime.fromISO(dateStr).toLocaleString(DateTime.DATETIME_MED);

  return (
    <Depth key={comment._id} depth={comment.depth}>
      <Avatar size={30} src={comment.user.profile_image} />
      <CommentWrap>
        <UserId>{comment.user.uid}</UserId>
        <Content>{comment.contents}</Content>
        <TimeAndReply>
          <span>{postTime}</span>
          <button
            className="reply"
            onClick={() => {
              setReplyOpen((value) => !value);
            }}
          >
            {t('button-common.Reply')}
          </button>
          <span className="buttonWrap">
            {comment.user_id === me?.id ? (
              <button
                className="delete"
                onClick={() => {
                  if (!window.confirm('Are you sure?')) return false;
                  remove(`/socials/comments/${comment._id}`).then(() => {
                    mutate();
                  });
                }}
              >
                {t('button-common.Delete')}
              </button>
            ) : (
              <IconTypeButton iconSrc={'/ic-more-15'} iconType={'svg'} size={15} onClick={() => openSelectList()} />
            )}
          </span>
        </TimeAndReply>
        {isReplyOpen && (
          <ReplyInput>
            <input placeholder="Write a comment" value={content} onChange={(event) => setContent(event.target.value)} />
            <button
              onClick={() => {
                postAction('/socials/comments', {
                  post_id: comment.post_id,
                  contents: content,
                  group: comment._id,
                  post_user_id: me?.id,
                }).then(() => {
                  setContent('');
                  mutate();
                });
              }}
            >
              {t('chats.Send')}
            </button>
            <button onClick={() => setReplyOpen(false)}>{t('button-common.Cancel')}</button>
          </ReplyInput>
        )}
      </CommentWrap>
    </Depth>
  );
}

interface CommentsProps {
  comments: CommentsType[];
  mutate: () => void;
}

const Comments = ({ comments, mutate }: CommentsProps) => {
  return (
    <Container>
      {comments.map((comment) => (
        <CommentItem comment={comment} mutate={mutate} />
      ))}
    </Container>
  );
};

export default Comments;

const Container = styled.ul`
  margin: 0 auto;
  max-width: ${MAX_WIDTH}px;
  min-width: ${MIN_WIDTH}px;
  background-color: #f2f2f2;
  padding: 20px;
`;

interface DepthProps {
  depth: number;
}
const Depth = styled.li`
  margin-bottom: 20px;
  display: flex;
  img {
    display: inline-block;
  }
  padding-left: ${(props: DepthProps) => props.depth * 60}px;
`;

const TimeAndReply = styled.p`
  position: relative;
  padding-top: 5px;
  span {
    color: #bbb;
    font-size: 11px;
    padding-right: 8px;
  }
  button {
    font-size: 13px;
    color: ${COLOR.PRIMARY};
  }

  button.delete {
    color: ${COLOR.RED};
  }

  .buttonWrap {
    position: absolute;
    right: 0;
    left: auto;
    bottom: 0;
  }
`;
const CommentWrap = styled.div`
  width: 100%;
  padding-top: 5px;
  padding-left: 8px;
  line-height: 1.4;
`;
const UserId = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${COLOR.BLACK};
  padding-right: 8px;
`;
const Content = styled.span`
  font-size: 13px;
  color: #777;
`;

const ReplyInput = styled.div`
  background-color: #fff;
  position: relative;
  margin-top: 5px;

  input {
    padding: 8px;
    height: 100%;
    width: calc(100% - 85px);
    &::placeholder {
      font-size: 16px;
      color: #bbb;
    }
  }

  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 50px;
    padding-left: 10px;
    font-size: 13px;
    color: #f68722;
    display: inline-block;
    &:last-child {
      right: 5px;
      color: #aaa;
    }
  }
`;
