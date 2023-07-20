import styled from 'styled-components';
import {getEllipsis, getCenter} from 'lib/getStyle';
import {COLOR} from 'constants/COLOR';
import {IconTypeButton} from 'components/atom';

type Props = {
  value: string;
  id: any;
  handleCheckedList: (id: any) => void;
};

const Wrapper = styled.div`
  color: ${COLOR.BLACK};
  border: solid 1px ${COLOR.LIGHT_GRAY};

  ${getEllipsis(1, 28)}
  position: relative;
  justify-content: space-between;
  max-width: 116px;
  flex-shrink: 0;
  word-break: break-all;
  font-size: 13px;
  padding: 0 24px 0 8px;
  border-radius: 14px;
  margin: 0 10px 10px 0;
`;

const RestyledIconTypeButton = styled(IconTypeButton)`
  ${getCenter({v: true})}
  right:10px;
`;

export function Tag({value, id, handleCheckedList}: Props) {
  return (
    <Wrapper>
      <span>{value}</span>
      <RestyledIconTypeButton
        iconSrc="common/ic-close"
        iconType="svg"
        size={9}
        onClick={() => handleCheckedList(id)}
      />
    </Wrapper>
  );
}
