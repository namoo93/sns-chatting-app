import { Heading4, Radio } from 'components/atom';
import { Icon } from 'components/atom/images';
import NavbarLayout from 'components/layouts/NavbarLayout';
import { COLOR } from 'constants/COLOR';
import { BACKGROUND, BACKCOLOR } from 'constants/BACKGROUND';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useState } from 'react';
import CheckIcon from 'assets/check_round_on_22.svg';

type selectProps = {
  value: string;
  type: string;
};

type bgProps = {
  selected: selectProps;
  onSelectChange: (k: selectProps) => void;
};

const TabText = styled.span<{ active: boolean }>`
  color: ${({ active }) => (active ? COLOR.PRIMARY : '#999')};
  font-size: 14px;
`;

const LeftButtonWrapper = styled.div`
  position: relative;

  button {
    position: absolute;
    left: 14px;
  }

  .text_btn {
    width: 34px;
    left: auto;
    top: 3px;
    right: 20px;
    font-size: 14px;
    font-weight: normal;
    color: ${COLOR.PRIMARY};

    &:disabled {
      color: #ddd;
    }
  }
`;

const Tab = styled.button<{ active: boolean }>`
  display: flex;
  flex: 1;
  border-bottom-width: 2px;
  justify-content: center;
  align-items: center;
  border-color: ${({ active }) => (active ? COLOR.PRIMARY : '#999')}; ;
`;

const HeaderTabContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: calc(100vw - 185px);
  height: 50px;
  background-color: #fff;
`;

const HeadingWrap = styled.div`
  padding: 40px 0 14px;
  text-align: center;
  border-bottom: 1px solid #eee;
`;

const BgContainer = styled.div`
  width: calc(100% - 40px);
  margin: 30px 20px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(auto-fill, 126px);
  justify-content: center;
`;

const ColorCard = styled.div<{ bg?: string; selected }>`
  width: 123px;
  height: 123px;
  margin: 1.5px;
  background-color: ${(props) => props.bg || ''};

  position: relative;

  img {
    display: none;
  }

  ${(props) => {
    if (props.selected) {
      return css`
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          display: block;
        }

        ::after {
          width: 123px;
          height: 123px;
          content: ' ';
          position: absolute;
          top: 0px;
          left: 0px;
          border: 2px solid #f68722;
        }
      `;
    }
  }}
`;

const BgCard = styled.div<{ bg?: string; selected }>`
  width: 123px;
  height: 123px;
  margin: 1.5px;
  overflow: hidden;
  background-image: ${(props) => props.bg || ''};
  object-fit: cover;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  .icon-img {
    display: none;
  }

  ${(props) => {
    if (props.selected) {
      return css`
        .icon-img {
          display: block;
          position: absolute;
        }

        ::after {
          width: 123px;
          height: 123px;
          content: ' ';
          position: absolute;
          top: 0px;
          left: 0px;
          border: 2px solid #f68722;
        }
      `;
    }
  }}
`;
const BackSquareComponent = ({ type, selected, image, onClick }): JSX.Element => {
  if (type === 'color') {
    return (
      <ColorCard bg={image} selected={selected} onClick={onClick}>
        <img src={CheckIcon} alt="selected" />
      </ColorCard>
    );
  }
  return (
    <BgCard selected={selected} onClick={onClick}>
      <img src={image} alt="image" />
      <img className="icon-img" src={CheckIcon} alt="selected" />
    </BgCard>
  );
};

const chatTabList = [
  {
    label: 'Colors',
    value: 'color',
  },
  {
    label: 'Images',
    value: 'image',
  },
  {
    label: 'Gallery',
    value: 'gallery',
  },
];

const ColorBackground = ({ selected, onSelectChange }: bgProps): JSX.Element => {
  return (
    <BgContainer>
      {BACKCOLOR.map((rgb, index) => {
        return (
          <BackSquareComponent
            type="color"
            selected={selected.type === 'color' && selected.value === index.toString()}
            onClick={() => onSelectChange({ value: index.toString(), type: 'color' })}
            image={rgb}
          />
        );
      })}
    </BgContainer>
  );
};

const ImageBackground = ({ selected, onSelectChange }: bgProps): JSX.Element => {
  return (
    <BgContainer>
      {BACKGROUND.map((img, index) => {
        return (
          <BackSquareComponent
            type="image"
            selected={selected.type === 'image' && selected.value === index.toString()}
            onClick={() => onSelectChange({ value: index.toString(), type: 'image' })}
            image={img}
          />
        );
      })}
    </BgContainer>
  );
};

const GalleryBackground = ({ selected, onSelectChange }: bgProps): JSX.Element => {
  return (
    <BgContainer>
      {BACKGROUND.map((img, index) => {
        return (
          <BackSquareComponent
            type="image"
            selected={selected.type === 'image' && selected.value === index.toString()}
            onClick={() => onSelectChange({ value: index.toString(), type: 'image' })}
            image={img}
          />
        );
      })}
    </BgContainer>
  );
};
const ChatBackground = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState<string>('color');

  const [selected, setSelected] = useState<selectProps>({ value: '0', type: 'color' });
  return (
    <NavbarLayout setting={true} scroll>
      <HeadingWrap>
        <LeftButtonWrapper>
          <button>
            <Icon size={22} src={'/images/icon/ic-prev-22.png'} onClick={() => navigate(-1)} />
          </button>
          <Heading4>Chat Background</Heading4>
          <button type="submit" className="text_btn" onClick={() => {}}>
            Done
          </button>
        </LeftButtonWrapper>
      </HeadingWrap>
      <HeaderTabContainer>
        {chatTabList.map((tab) => (
          <Tab
            active={tab.value === tabValue}
            onClick={() => {
              setTabValue(tab.value);
            }}
          >
            <TabText active={tab.value === tabValue}>{tab.label}</TabText>
          </Tab>
        ))}
      </HeaderTabContainer>
      {tabValue === 'color' && <ColorBackground selected={selected} onSelectChange={(k) => setSelected(k)} />}
      {tabValue === 'image' && <ImageBackground selected={selected} onSelectChange={(k) => setSelected(k)} />}
      {tabValue === 'gallery' && <GalleryBackground selected={selected} onSelectChange={(k) => setSelected(k)} />}
    </NavbarLayout>
  );
};

export default ChatBackground;
