import React from 'react';
import styled from 'styled-components';

type SwrContainerProps<T> = {
  error?: any;
  data: T;
  loadingIndicator?: React.ReactNode;
  errorView?: React.ReactNode;
  children?: React.ReactElement;
};

function DefaultError({error}: any) {
  return <>Error : {JSON.stringify(error)}</>;
}

function DefaultIndicator() {
  return (
    <Indicator>
      <div className="dot-stage">
        <span className="dot-pulse" />
      </div>
    </Indicator>
  );
}

const SwrContainer = ({
  error,
  data,
  loadingIndicator,
  errorView,
  children,
}: SwrContainerProps<any>) => {
  if (error) return errorView ? <>{errorView}</> : <DefaultError error={error} />;
  if (!data)
    return loadingIndicator ? <>{loadingIndicator}</> : <DefaultIndicator />;
  return <>{children}</>;
};

const Indicator = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  max-height: 100%;
  max-width: 100%;
  padding: 30px;
  position: relative;
  width: 100%;
  > div {
    opacity: 0.3;
    position: absolute;
    width: 200px;
  }
`;

export default SwrContainer;
