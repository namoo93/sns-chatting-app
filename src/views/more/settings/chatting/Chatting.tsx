import { Heading4, Switch } from 'components/atom';
import { Icon } from 'components/atom/images';
import NavbarLayout from 'components/layouts/NavbarLayout';
import { COLOR } from 'constants/COLOR';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeadingWrap = styled.div`
  padding: 40px 0 14px;
  text-align: center;
  border-bottom: 1px solid #eee;
`;

const AllButtonWrapper = styled.button`
  display: flex;
  width: 100%;
  text-align: left;
  align-items: center;
  justify-content: space-between;
`;
const SideSwitchWrapper = styled.div`
  position: relative;
`;
const Wrapper = styled.div`
  padding: 22px;
  border-bottom: 1px solid #eeeeee;
  strong {
    display: block;
    width: calc(100% - 50px);
    font-size: 14px;
    color: ${COLOR.BLACK};
    font-weight: 500;

    &.padding_0 {
      padding-bottom: 0px;
    }
  }

  .notifications_info {
    display: block;
    width: calc(100% - 50px);
    font-size: 13px;
    color: #bbb;
    word-break: keep-all;

    .bold {
      font-weight: bold;
    }
  }

  .reset_all_notifications_btn {
    margin-top: 20px;
    border-radius: 10px;
  }
`;

const SideSwitch = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  margin-top: 3px;
  transform: translateY(-50%);
`;

const Chatting = () => {
  const navigate = useNavigate();
  return (
    <NavbarLayout setting={true}>
      <HeadingWrap>
        <Heading4>Chatting</Heading4>
      </HeadingWrap>

      <Wrapper>
        <AllButtonWrapper onClick={() => navigate('/more/settings/chatting/export-chats')}>
          <strong className="padding_0">Export chats</strong>
          <Icon size={22} src={'/images/icon/ic-next-22.png'} />
        </AllButtonWrapper>
      </Wrapper>
      <Wrapper>
        <SideSwitchWrapper>
          <strong>Archive chats</strong>
          <SideSwitch>
            <Switch className="right_switch" ison onClick={() => {}} />
          </SideSwitch>
        </SideSwitchWrapper>
      </Wrapper>
      <Wrapper>
        <SideSwitchWrapper>
          <strong>Word suggestion</strong>
          <SideSwitch>
            <Switch className="right_switch" ison onClick={() => {}} />
          </SideSwitch>
        </SideSwitchWrapper>
      </Wrapper>
      <Wrapper>
        <strong>Delete all chat messages</strong>
      </Wrapper>
      <Wrapper>
        <strong>Leave all chatrooms</strong>
      </Wrapper>
    </NavbarLayout>
  );
};

export default Chatting;
