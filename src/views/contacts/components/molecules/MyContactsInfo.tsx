import { Avatar } from 'components/atom';
import styled from 'styled-components';
import { Column, Row } from 'components/layouts';
import { NO_FRAME_WINDOW_OPTIONS } from 'constants/CONST';
import { IMyInfo } from 'modules/users/types';
import { getEllipsis } from 'utilites';

const Container = styled.div`
  padding: 8px 12px;
  width: 100%;
  margin-bottom: 16px;
`;

const Wrapper = styled(Row)`
  border-radius: 10px;
  height: 80px;
  padding: 8px 12px;
  width: 100%;
  background-color: #ffffff;
`;

const MyInfo = styled(Column)`
  height: 80px;
  padding: 8px 0px;
  margin-left: 20px;
  width: 100%;
  gap: 3px;
  align-items: flex-start;
  span {
    font-size: 15px;
    font-weight: 500;
    line-height: normal;
    letter-spacing: normal;
    color: #262525;
    ${getEllipsis(1)}
  }
  span:last-child {
    font-size: 13px;
    font-weight: normal;
    line-height: normal;
    color: #bcb3c5;
    ${getEllipsis(1)}
  }
`;

export type MyContactsInfoProps = {
  data?: IMyInfo;
};

export const MyContactsInfo = ({ data }: MyContactsInfoProps) => {
  const ret = () => {
    window.open(
      `/profile-detail?id=${data?.id}&first_name=${data?.first_name}&last_name=${data?.last_name}&uid=${data?.uid}&profile_image=${data?.profile_image}`,
      'Profile-detail',
      NO_FRAME_WINDOW_OPTIONS,
    );
  };
  return (
    <Container>
      <Wrapper>
        <Avatar
          size={55}
          src={data?.profile_image}
          onClick={() => {
            ret?.();
          }}
        />
        <Row>
          <MyInfo>
            <span>{`${data?.first_name} ${data?.last_name}`}</span>
            <span>{data?.uid}</span>
          </MyInfo>
        </Row>
      </Wrapper>
    </Container>
  );
};

export default MyContactsInfo;
