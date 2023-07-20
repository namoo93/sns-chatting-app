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

export const Alarm = ({ active, onClick }: FavoriteProps) => {
  return (
    <Container type="button" onClick={onClick}>
      <Image
        src={`/images/profile-detail/ic-alarm-${active ? 'on' : 'off'}.svg`}
      />
    </Container>
  );
};
