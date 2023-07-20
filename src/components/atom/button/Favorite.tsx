import styled from 'styled-components';

interface FavoriteProps {
  active: boolean;
  onClick: (e) => void;
}

const Container = styled.button`
  height: 22px;
  width: 22px;
`;

const Image = styled.img`
  width: 100%;
`;

export const Favorite = ({ active, onClick }: FavoriteProps) => {
  return (
    <Container type="button" onClick={onClick}>
      <Image
        src={`/images/profile-detail/ic-favorite-${active ? 'on' : 'off'}.svg`}
      />
    </Container>
  );
};
