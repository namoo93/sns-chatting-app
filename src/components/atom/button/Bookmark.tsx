import styled from 'styled-components';

interface BookmarkProps {
  active: boolean;
  onClick: () => void;
}


const Container = styled.button`
  height: 22px;
  width: 22px;
`;

const Image = styled.img`
  width: 100%;
`;

export const Bookmark = ({active, onClick}: BookmarkProps) => {
  return (
    <Container type="button" onClick={onClick}>
      <Image src={`/images/settings/ic-bookmark-${active ? 'on' : 'off'}.svg`} />
    </Container>
  );
};
