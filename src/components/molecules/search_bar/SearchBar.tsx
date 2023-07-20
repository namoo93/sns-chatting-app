import styled from 'styled-components';
import React from 'react';
import {Icon, IconTypeButton} from 'components/atom';
import TextInput from 'components/atom/input/TextInput';
import {Row} from 'components/layouts';
import {COLOR} from 'constants/COLOR';
import { useNavigate } from 'react-router-dom';

const Container = styled(Row)`
  height: 48px;
  margin: 10px 0 20px;
  width: 100%;
  padding: 0 20px;
  position: relative;
  background: transparent;
`;

const Input = styled(TextInput)`
  ${({borderNone}) => borderNone ?
    `border: none; 
    `
  :
    `border-bottom: 1px solid #ededed;` 
  }
  color: ${COLOR.BLACK};
  font-size: 16px;
  padding: 0 26px;
  
  ${({withCancel}) => withCancel ?  
    `padding-right: 75px;`
    :
    `padding-right: 36px;`
  }

  &::placeholder {
    color: ${COLOR.GRAY};
  }
`;

const CancelButton = styled.button`
  position: absolute;
  right: 20px;
  color: #bbb;
  font-size: 12px;
  margin-left: 20px;
`;

const RestyledIcon = styled(Icon)`
  position: absolute;
  left: 20px;
`;

const RestyledIconTypeButton = styled(IconTypeButton)`
  position: absolute;
  right: 30px;
  ${({withCancel}) => withCancel ?  
    `right: 70px;`
    :
    `right: 30px;`
  }
`;

type Props = {
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
  withCancel?: boolean;
  onClick?: ()=> void;
  onKeyUp?: (e)=> void;
  isBack?: boolean;
  borderNone?: boolean;
  className?: string;
};

export const SearchBar: React.FC<Props> = ({className, onChange, placeholder, value, withCancel, onClick, onKeyUp, isBack = false, borderNone}) => {
  const navigate = useNavigate();

  return (
  <Container className={className}>
    {
      isBack ?
      <button>
        <Icon size={22} src={'/images/icon/ic-prev-22.png'} onClick={() => navigate(-1)} />
      </button>
      :
      <RestyledIcon size={16} src="/images/settings/ic-search.svg" />
    }
    <Input
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      value={value}
      onKeyUp={onKeyUp}
      borderNone={borderNone}
      withCancel={withCancel}
    />
    {value && (
      isBack ?
        <></>
      :
        <RestyledIconTypeButton
          iconSrc="icon/ic_close"
          iconType="png"
          size={16}
          icSize={16}
          onClick={() => onChange('')}
          withCancel={withCancel}
        />
    )}
    {withCancel && (
      isBack ?
        <></>
      :
        <CancelButton onClick={onClick}>Cancel</CancelButton> 
    )}
  </Container>
 );
};
