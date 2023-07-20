import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {ModalContext} from 'contexts';
import {Dialog} from 'components/molecules/dialog';
import {toast} from 'react-toastify';
import {Icon} from 'components/atom/images';
import {Checkbox, Radio} from 'components/atom/input';
import {Switch} from 'components/atom/switch';
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from 'components/atom/typography';
import {
  Button,
  ButtonVariant,
  IconButton,
  IconTypeButton,
} from 'components/atom/button';
import {Select} from 'components/atom/select';
import NavbarLayout from 'components/layouts/NavbarLayout';
import {
  PrevHeader,
  TitleHeader,
  ButtonHeader,
  MainHeader,
} from 'components/molecules';
import {COLOR} from 'constants/COLOR';

function Components() {
  const navigate = useNavigate();

  // * Modal
  const {openModal} = useContext(ModalContext);

  // * Modal
  const onClickModal = () => {
    openModal(<Dialog title={'Modal'} text={'Modal text'} />);
  };

  // * Notification
  const onClickNotification = () => {
    toast('Notification', {type: 'error'});
  };

  // * Select
  const selectoption = [
    {value: 0, label: 'VN'},
    {value: 0, label: 'VN'},
    {value: 0, label: 'VN'},
  ];

  return (
    <>
      <NavbarLayout setting={false}>
        <div style={{overflowY: 'scroll', height: '100vh'}}>
          <Heading1>Components</Heading1>
         
          <button onClick={() => navigate(-1)}>뒤로</button>

          {/* * Modal */}
          <Heading2>Modal</Heading2>
          <button onClick={onClickModal}>open modal</button>

          {/* * Notification */}
          <Heading2>Notification</Heading2>
          <button onClick={onClickNotification}>open notification</button>

          {/* Icon */}
          <Heading2>Icon</Heading2>
          <Icon size={23} src={'/images/ic_like_on_22@3x.png'} />

          {/* Checkbox */}
          <Heading2>Checkbox</Heading2>
          <Checkbox
            name={'check01'}
            id={'check01'}
            value={'check01'}
            onClick={() => {}}
            marginRight={0}
            marginLeft={0}
            label={`marginRight_0,marginLeft_0,fontSize_13,fullWidth 두 줄일 경우 ,두 줄일 경우,두 줄일 경우,두 줄일 경우,두 줄일 경우`}
            fontSize={13}
            lineHeight={15}
            fullWidth
          />
          <Checkbox
            name={'check02'}
            id={'check02'}
            value={'check02'}
            onClick={() => {}}
            marginRight={5}
            marginLeft={0}
            label={'marginRight_5,marginLeft_5,fontSize_14,'}
            fontSize={14}
            lineHeight={18}
          />
          <Checkbox
            name={'check03'}
            id={'check03'}
            value={'check03'}
            onClick={() => {}}
            marginRight={10}
            marginLeft={10}
            label={'marginRight_10,marginLeft_10,fontSize_16'}
            fontSize={16}
            lineHeight={18}
          />
          <Checkbox
            name={'check04'}
            id={'check04'}
            value={'check04'}
            onClick={() => {}}
            marginRight={10}
            marginLeft={10}
            checkRound
            label={'checkRound'}
            fontSize={13}
            lineHeight={15}
          />
          <Checkbox
            name={'check04'}
            id={'check04'}
            value={'check04'}
            onClick={() => {}}
            marginRight={10}
            marginLeft={10}
            checkRound
            fontSize={13}
            lineHeight={15}
          />
          <Checkbox
            name={'check04'}
            id={'check04'}
            value={'check04'}
            onClick={() => {}}
            marginRight={10}
            marginLeft={10}
            fontSize={13}
            lineHeight={15}
          />

          {/* Radio */}
          <Heading2>Radio</Heading2>
          <Radio
            defaultChecked
            id={'radio01'}
            name={'radio01'}
            label={'radio01 defaultChecked,fullWidth'}
            onClick={() => {}}
            marginRight={0}
            marginLeft={0}
            value={'radio01'}
            fontSize={13}
            lineHeight={15}
            fullWidth
          />
          <Radio
            id={'radio02'}
            name={'radio02'}
            label={'radio02 fontSize_16'}
            onClick={() => {}}
            marginRight={0}
            marginLeft={0}
            textMarginLeft={30}
            value={'radio02'}
            fontSize={16}
            lineHeight={18}
          />
          <Radio
            smallRadio
            id={'radio03'}
            name={'radio03'}
            label={'radio03 smallRadio'}
            onClick={() => {}}
            marginRight={0}
            marginLeft={10}
            textMarginLeft={22}
            value={'radio03'}
            fontSize={0}
            lineHeight={18}
          />
          <Radio
            id={'radio04'}
            name={'radio04'}
            value={'radio04'}
            label={' '}
          />
          <Radio
            smallRadio
            id={'radio06'}
            name={'radio06'}
            value={'radio06'}
            label={' '}
          />

          {/* Switch */}
          <Heading2>Switch</Heading2>
          <Switch
            ison={true}
            onClick={() => {}}
            marginRight={0}
            marginLeft={0}
            toggle={true}
          />
          <Switch
            ison={false}
            onClick={() => {}}
            marginRight={0}
            marginLeft={0}
            toggle={false}
          />

          {/* Button */}
          <Heading2>Button</Heading2>
          <Button
            className={'string'}
            type={'submit'}
            onClick={() => {}}
            fontSize={18}
            fullWidth>
            type_submit,fullWidth,margin_0,fontSize_18
          </Button>
          <Button
            className={'string'}
            type={'button'}
            onClick={() => {}}
            fontSize={18}
            fullWidth
            margin={10}
            variant={ButtonVariant.Default}
            borderRadius>
            type_button,margin_10,borderRadius,ButtonVariant.Default
          </Button>
          <Button
            className={'string'}
            type={'button'}
            onClick={() => {}}
            fontSize={18}
            fullWidth
            variant={ButtonVariant.Default}
            margin={10}
            active
            borderRadius>
            ButtonVariant.Default_active
          </Button>
          <Button
            className={'string'}
            type={'button'}
            onClick={() => {}}
            fontSize={18}
            fullWidth
            variant={ButtonVariant.Default}
            margin={10}
            inactive
            borderRadius>
            ButtonVariant.Default_inactive
          </Button>
          <Button
            className={'string'}
            type={'button'}
            onClick={() => {}}
            fontSize={18}
            fullWidth
            margin={10}
            variant={ButtonVariant.Gray}
            borderRadius>
            ButtonVariant.Gray
          </Button>
          <Button
            className={'string'}
            type={'button'}
            onClick={() => {}}
            fontSize={18}
            fullWidth
            margin={10}
            variant={ButtonVariant.Gray}
            active
            borderRadius>
            ButtonVariant.Gray_active
          </Button>
          <Button
            className={'string'}
            type={'button'}
            onClick={() => {}}
            fontSize={18}
            fullWidth
            margin={10}
            variant={ButtonVariant.Gray}
            inactive
            borderRadius>
            ButtonVariant.Gray_inactive
          </Button>
          <Button
            className={'string'}
            type={'button'}
            onClick={() => {}}
            width={100}
            height={42}
            margin={10}
            variant={ButtonVariant.Default}
            borderRadius>
            Default
          </Button>
          <Button
            className={'string'}
            type={'button'}
            onClick={() => {}}
            width={100}
            height={42}
            margin={10}
            variant={ButtonVariant.Gray}
            borderRadius>
            Gray
          </Button>
          <Button
            className={'string'}
            type={'button'}
            onClick={() => {}}
            width={100}
            height={42}
            margin={10}
            variant={ButtonVariant.Gray}
            borderRadius
            inactive>
            inactive
          </Button>
          <Button
            className={'string'}
            type={'button'}
            onClick={() => {}}
            width={100}
            height={42}
            margin={10}
            variant={ButtonVariant.Outlined}
            borderRadius>
            Outlined
          </Button>
          <Button
            className={'string'}
            type={'button'}
            onClick={() => {}}
            width={100}
            height={42}
            margin={10}
            variant={ButtonVariant.Outlined}
            borderRadius
            blacklined>
            Blacklined
          </Button>
          <Button
            className={'string'}
            type={'button'}
            onClick={() => {}}
            width={100}
            height={30}
            variant={ButtonVariant.Text}>
            TextBtn
          </Button>
          <Button
            className={'string'}
            type={'button'}
            onClick={() => {}}
            width={150}
            height={30}
            variant={ButtonVariant.Text}
            fontWeight={500}>
            fontWeight_500
          </Button>
          <Button
            className={'string'}
            type={'button'}
            onClick={() => {}}
            width={100}
            height={30}
            variant={ButtonVariant.Text}
            fontWeight={500}
            grayText>
            grayText
          </Button>
          <Button
            className={'string'}
            type={'button'}
            onClick={() => {}}
            width={100}
            height={30}
            variant={ButtonVariant.Text}
            fontWeight={500}
            redText>
            redText
          </Button>
          <Button
            className={'string'}
            type={'button'}
            onClick={() => {}}
            width={150}
            height={30}
            variant={ButtonVariant.Text}
            fontWeight={500}
            deepGrayText>
            deepGrayText
          </Button>

          {/* IconButton */}
          <Heading2>IconButton</Heading2>
          <IconButton
            iconName={'ic-add-white22'}
            onClick={() => {}}
            marginRight={5}
            marginLeft={5}
            textMarginLeft={10}
            fontSize={16}
            fontWeight={500}
            width={500}
            borderRadius>
            /images/icon/'iconName'.png
          </IconButton>

          <IconButton
            iconName={'send'}
            iconWidth={15}
            iconHeight={15}
            onClick={() => {}}
            marginRight={5}
            marginLeft={5}
            textMarginLeft={5}
            fontWeight={500}
            width={82}
            height={36}
            borderRadiusRound>
            Text
          </IconButton>

          <IconButton
            iconName={'check-black'}
            variant={ButtonVariant.White}
            white
            iconWidth={15}
            iconHeight={15}
            onClick={() => {}}
            marginRight={5}
            marginLeft={5}
            textMarginLeft={5}
            fontWeight={500}
            width={82}
            height={36}
            borderRadiusRound>
            Text
          </IconButton>

          <IconButton
            iconName={'ic-add-22'}
            variant={ButtonVariant.Outlined}
            blacklined
            borderRadius
            onClick={() => {}}
            marginRight={5}
            marginLeft={5}
            textMarginLeft={10}
            fontSize={16}
            fontWeight={500}
            width={200}>
            Text
          </IconButton>

          <IconButton
            iconName={'ic-undo-13'}
            iconWidth={13}
            iconHeight={13}
            variant={ButtonVariant.Text}
            deepGrayText
            onClick={() => {}}
            marginRight={5}
            marginLeft={5}
            textMarginLeft={5}
            fontWeight={500}
            width={100}
            height={30}>
            TextBtn
          </IconButton>
          <IconButton
            iconName={'ic-remove-13'}
            iconWidth={13}
            iconHeight={13}
            variant={ButtonVariant.Text}
            redText
            onClick={() => {}}
            marginRight={5}
            marginLeft={5}
            textMarginLeft={5}
            fontWeight={500}
            width={100}
            height={30}>
            TextBtn
          </IconButton>
          <IconButton
            iconName={'send'}
            width={30}
            height={30}
            iconWidth={15}
            iconHeight={15}
            onClick={() => {}}
            borderRadiusRound
            iconOnly
            backgroundColor={COLOR.RED}
          />

          <IconTypeButton iconSrc="settings/ic-bookmark-on" iconType="svg" />

          {/* Select */}
          <Heading2>Select</Heading2>
          <Select
            options={selectoption}
            iconName={'ic-phone-16'}
            width={150}
            margin={10}
          />

          {/* HeadingText */}
          <Heading2>HeadingText</Heading2>
          <Heading1> Heading1 </Heading1>
          <Heading2> Heading2 </Heading2>
          <Heading3> Heading3 </Heading3>
          <Heading4> Heading4 </Heading4>
          <Heading5> Heading5 </Heading5>
          <Heading6> Heading6 </Heading6>

           {/* Header */}
          <PrevHeader
            title="Components"
            button={[
              <Icon key={0} size={23} src={'/images/ic_like_on_22@3x.png'} />,
            ]}
          />

          <PrevHeader customTitle={<div>PrevHeader custom</div>} />
          
          <TitleHeader title="Title Header" />

          <TitleHeader
            title="Left Title Header"
            justify="flex-start"
            button={[
              <Icon key={0} size={23} src={'/images/ic_like_on_22@3x.png'} />,
            ]}
          />
          <ButtonHeader
            close={true}
            color="black"
            button={[
              <Icon key={0} size={23} src={'/images/ic_like_on_22@3x.png'} />,
            ]}
          />
          <MainHeader
            title="Main Header"
            button={[
              <Icon key={0} size={22} src={'/images/ic_like_on_22@3x.png'} />,
              <Icon key={1} size={22} src={'/images/ic_like_on_22@3x.png'} />,
              <Icon key={2} size={22} src={'/images/ic_like_on_22@3x.png'} />,
            ]}
          />
        </div>
      </NavbarLayout>
    </>
  );
}

export default Components;
