import { Icon } from 'components/atom/images';
import NavbarLayout from 'components/layouts/NavbarLayout';
import { PrevHeader } from 'components/molecules';
import { COLOR } from 'constants/COLOR';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 20px;

  strong {
    display: block;
    width: 100%;
    font-size: 14px;
    color: ${COLOR.BLACK};
    font-weight: normal;
    padding-bottom: 3px;

    &.padding_0 {
      padding-bottom: 0px;
    }
  }
`;
const AllButtonWrapper = styled.button`
  display: flex;
  width: 100%;
  text-align: left;
  align-items: center;
  justify-content: space-between;

  span {
    color: #bbb;
    font-size: 13px;
    text-align: right;
    width: 100%;
    padding-right: 5px;
  }
`;
const AllWrapper = styled.div`
  display: flex;
  width: 100%;
  text-align: left;
  align-items: center;
  justify-content: space-between;

  span {
    color: #bbb;
    font-size: 13px;
    text-align: right;
    width: 100%;
    padding-right: 5px;
  }
`;
const GrayLine = styled.div`
  height: 1px;
  background-color: #eee;
`;
const Divider = styled.div`
  height: 8px;
  background-color: #f8f8f8;
`;
const Version = styled.p`
  font-size: 14px;
  color: ${COLOR.BLACK};
  font-weight: normal;
  width: 50px;
`;
const Desc = styled.p`
  font-size: 13px;
  color: #bbbbbb;
`;
const Help = () => {
  const version = '0. 0. 0';

  return (
    <NavbarLayout setting={true}>
      <PrevHeader title='Help' />
      <Wrapper>
        <AllButtonWrapper onClick={() => window.open('https://living-bowl-f8a.notion.site/Support-Center-5be37da7fcf14ad1b0a66523a6b7f2bc')}>
          <strong className="padding_0">
            Support Center
          </strong>
          <Icon size={22} src={'/images/icon/ic-next-22.png'} />
        </AllButtonWrapper>
      </Wrapper>
      <GrayLine />
      <Wrapper>
        <AllButtonWrapper onClick={() => console.log('mailto')}>
          <strong className="padding_0">
            Contact us
          </strong>
          <Icon size={22} src={'/images/icon/ic-next-22.png'} />
        </AllButtonWrapper>
      </Wrapper>
      <GrayLine />
      <Wrapper>
        <AllButtonWrapper onClick={() => window.open('https://living-bowl-f8a.notion.site/Terms-of-Service-4519e155aa0c416cb18e9f15bb7f57a1')}>
          <strong className="padding_0">
            Terms of Service
          </strong>
          <Icon size={22} src={'/images/icon/ic-next-22.png'} />
        </AllButtonWrapper>
      </Wrapper>
      <GrayLine />
      <Wrapper>
        <AllButtonWrapper onClick={() => window.open('https://living-bowl-f8a.notion.site/Lisences-6885340530764fa5a8a27d95fda8ef92')}>
          <strong className="padding_0">
            Lisences
          </strong>
          <Icon size={22} src={'/images/icon/ic-next-22.png'} />
        </AllButtonWrapper>
      </Wrapper>
      <GrayLine />
      <Divider />
      <Wrapper>
        <AllWrapper>
          <strong className="padding_0">
            Current version
          </strong>
          <Version>
            {version}
          </Version>
        </AllWrapper>
        <Desc>You are using the lastest version</Desc>
      </Wrapper>
    </NavbarLayout>
  );
}

export default Help;
