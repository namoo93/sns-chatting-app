import styled from 'styled-components';

const Component = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const Inner = styled.div`
  width: 390px;
  height: 640px;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AuthContainer = ({...props}) => {
  return (
    <Component {...props}>
      <Inner>{props.children}</Inner>
    </Component>
  );
};
