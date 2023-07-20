import { Avatar, ButtonVariant, Icon, IconButton } from 'components/atom';
import styled from 'styled-components';
import { Column, Row } from 'components/layouts';
import Highlighter from 'react-highlight-words';
import { useRef, useState, useEffect } from 'react';
import { NO_FRAME_WINDOW_OPTIONS } from 'constants/CONST';
import { toast } from 'react-toastify';
import { getEllipsis } from 'utilites';
import moment from 'moment';
import { post, remove } from 'net/rest/api';
import { useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  padding: 8px 12px;
  width: 100%;
`;

const Wrapper = styled(Row)`
  border-radius: 10px;
  height: 80px;
  padding: 8px 12px;
  width: 100%;
  background-color: #ffffff;
  transition: 0.15s;
  :hover {
    box-shadow: 0 7px 16px 0 rgba(0, 0, 0, 0.13);
  }
`;

const InfoBox = styled(Row)`
  width: 100%;
`;

const Info = styled(Column)`
  height: 80px;
  padding: 8px 0px;
  margin-left: 20px;
  width: 100%;
  gap: 3px;
  align-items: flex-start;
`;

const Name = styled.span`
  font-size: 15px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: normal;
  color: #262525;
  ${getEllipsis(1)}
`;

const Tag = styled.span`
  font-size: 13px;
  color: #bcb3c5;
  ${getEllipsis(1)}
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 8px;
  > * {
    margin-left: 15px;
  }
`;

export type ContactsItemProps = {
  id: number;
  name?: string;
  uid?: string;
  first_name?: string;
  last_name?: string;
  profile_image?: string;
  birth?: string;
  edit?: boolean;
  block?: number;
  searchValue?: string;
  video_able?: number;
  call_able?: number;
  is_favorite?: number;
  is_mute?: number;
};

export const ContactsItem = ({
  edit,
  id,
  name,
  block,
  uid,
  first_name,
  last_name,
  profile_image,
  birth,
  searchValue,
  video_able,
  call_able,
  is_favorite,
  is_mute,
}: ContactsItemProps) => {
  const { t } = useTranslation();
  const [action, setAction] = useState<boolean>(false);

  const [rowBlock, setBlock] = useState(block);
  const Ref = useRef(null);
  const queryClient = useQueryClient();

  const _birth = moment(new Date()).format('YYYY-MM-DD');

  useEffect(() => {
    if (Ref.current) {
      // @ts-ignore
    }
  }, [Ref]);

  const onClickBlockMutate = () => {
    post('auth/block', {
      type: 'sns',
      target_id: Number(id),
    })
      .then(() => {
        toast('Success : Blocked the contact', { type: 'success' });
        setBlock(1);
        queryClient.invalidateQueries('getContacts');
      })
      .catch((e) => {
        console.log(e);
        toast('Error', { type: 'error' });
      });
  };

  const onClickUnBlockMutate = () => {
    remove(`auth/block/${Number(id)}`, {
      target_id: Number(id),
    })
      .then(() => {
        toast('Success : unBlocked the contact', { type: 'success' });
        setBlock(0);
        queryClient.invalidateQueries('getContacts');
      })
      .catch((e) => {
        console.log(e);
        toast('Error', { type: 'error' });
      });
  };

  // const reloadContacts = () => {

  // }

  const ret = () => {
    window.open(
      `/profile-detail?id=${id}&first_name=${first_name}&last_name=${last_name}&uid=${uid}&profile_image=${profile_image}&is_mute=${is_mute}&is_favorite=${is_favorite}`,
      'Profile-detail',
      NO_FRAME_WINDOW_OPTIONS,
    );
  };

  return (
    <Container
      ref={Ref}
      onMouseEnter={() => {
        setAction(true);
      }}
      onMouseLeave={() => {
        setAction(false);
      }}
    >
      <Wrapper>
        <Avatar
          size={55}
          src={profile_image}
          onClick={() => {
            ret?.();
          }}
        />
        <InfoBox justify="space-between">
          <Row>
            <Info>
              <Name>
                <Highlighter
                  searchWords={[searchValue]}
                  autoEscape={true}
                  textToHighlight={name}
                  highlightStyle={{
                    backgroundColor: 'transparent',
                    color: '#f68722',
                  }}
                />
                {birth === _birth && <Icon size={15} marginLeft={2} src={'/images/icon/ic-cake-15.png'} inline></Icon>}
              </Name>
              <Tag>
                <Highlighter
                  searchWords={[searchValue]}
                  autoEscape={true}
                  textToHighlight={uid}
                  highlightStyle={{
                    backgroundColor: 'transparent',
                    color: '#f68722',
                  }}
                />
              </Tag>
            </Info>
          </Row>
          {edit ? (
            <ButtonContainer>
              {rowBlock ? (
                <IconButton
                  iconName={'ic-undo-13'}
                  iconWidth={13}
                  iconHeight={13}
                  variant={ButtonVariant.Text}
                  deepGrayText
                  onClick={onClickUnBlockMutate}
                  textMarginLeft={5}
                  fontWeight={500}
                  height={30}
                >
                  {t('contact.Undelete')}
                </IconButton>
              ) : (
                <IconButton
                  iconName={'ic-remove-13'}
                  iconWidth={13}
                  iconHeight={13}
                  variant={ButtonVariant.Text}
                  redText
                  onClick={onClickBlockMutate}
                  textMarginLeft={5}
                  fontWeight={500}
                  height={30}
                >
                  {t('button-common.Delete')}
                </IconButton>
              )}
            </ButtonContainer>
          ) : (
            <ButtonContainer>
              {video_able && (
                <IconButton
                  iconWidth={action ? 35 : 24}
                  iconHeight={action ? 35 : 24}
                  iconName={action ? 'ic-call-35' : 'ic-call-24'}
                  backgroundColor={'#fff'}
                  iconOnly
                  onClick={() => {
                    alert('[TODO] : Voice Call');
                  }}
                />
              )}
              {call_able && (
                <IconButton
                  iconWidth={action ? 35 : 24}
                  iconHeight={action ? 35 : 24}
                  iconName={action ? 'ic-mov-35' : 'ic-mov-24'}
                  backgroundColor={'#fff'}
                  iconOnly
                  onClick={() => {
                    alert('[TODO] : Video Call');
                  }}
                />
              )}
            </ButtonContainer>
          )}
        </InfoBox>
      </Wrapper>
    </Container>
  );
};

export default ContactsItem;
