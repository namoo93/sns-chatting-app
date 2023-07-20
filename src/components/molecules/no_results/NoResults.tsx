import styled from 'styled-components';
import {Column} from 'components/layouts';
import {Icon, Heading4, Text} from 'components/atom';

type Props = {
  searchValue: string;
  iconImg?: string;
};

const Wrapper = styled(Column)`
  padding-top: 100px;
`;

const Title = styled(Heading4)`
  font-size: 18px;
  margin: 15px 0 8px;
`;
export default function NoResults({searchValue, iconImg='/images/ic-no-results.svg'}: Props) {
  return (
    <Wrapper>
      <Icon src={iconImg} size={52} />
      <Title>No Results</Title>
      <Text variant="caption_M">There were no results for '{searchValue}'</Text>
    </Wrapper>
  );
}
