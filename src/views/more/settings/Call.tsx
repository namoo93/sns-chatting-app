import { Heading4, Icon, Select } from 'components/atom';
import NavbarLayout from 'components/layouts/NavbarLayout';
import { COLOR } from 'constants/COLOR';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeadingWrap = styled.div`
  padding: 40px 0 14px;
  text-align: center;
  border-bottom: 1px solid #eee;
`;

const Wrapper = styled.div`
  padding: 22px;

  .select {
    margin-top: 10px;
    width: 100%;
    height: 42px;
    border: solid 1px #ededed;
  }

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

  p {
    font-size: 13px;
    color: #999;
    /* padding-bottom: 5px; */
    word-break: keep-all;
    margin-top: 5px;
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

const Call = () => {
  const navigate = useNavigate();
  return (
    <NavbarLayout setting={true}>
      <HeadingWrap>
        <Heading4>Call</Heading4>
      </HeadingWrap>
      <Wrapper>
        <strong>Speaker</strong>
        <Select
          className="select"
          width={132}
          height={32}
          options={[
            { label: `system default (Built-in)`, value: 0 },
            { label: `system default (Built-in)`, value: 1 },
            { label: `system default (Built-in)`, value: 2 },
          ]}
        />
      </Wrapper>
      <Wrapper>
        <strong>Microphone</strong>
        <Select
          className="select"
          width={132}
          height={32}
          options={[
            { label: `system default (Built-in)`, value: 0 },
            { label: `system default (Built-in)`, value: 1 },
            { label: `system default (Built-in)`, value: 2 },
          ]}
        />
      </Wrapper>
      <Wrapper>
        <strong>Camera</strong>
        <p>This setting will be applied in Video Call and Kokkok Live.</p>

        <Select
          className="select"
          width={132}
          height={32}
          options={[
            { label: `system default (Built-in)`, value: 0 },
            { label: `system default (Built-in)`, value: 1 },
            { label: `system default (Built-in)`, value: 2 },
          ]}
        />
      </Wrapper>
    </NavbarLayout>
  );
};

export default Call;
