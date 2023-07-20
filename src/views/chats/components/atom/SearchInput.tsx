import styled from 'styled-components';
import { Icon } from 'components/atom';
import TextInput from 'components/atom/input/TextInput';

type Props = {
  onChange: (value: string) => void;
};

const Wrapper = styled.div`
  position: relative;
  padding: 0 20px;
`;
const RestyledIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

export function SearchInput({ onChange }: Props) {
  return (
    <Wrapper>
      <RestyledIcon src={'/images/chats/ic_search.svg'} size={16} />
      <TextInput
        placeholder="Search by name, phone number or E-mail"
        padding={'0 0 0 28px'}
        onChange={e => onChange(e.target.value)}
      />
    </Wrapper>
  );
}
