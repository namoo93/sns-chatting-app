import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { COLOR } from 'constants/COLOR';

type TimerProps = {
  mm: number;
  ss: number;
  restart?: boolean;
};

const CountDownSpan = styled.span`
  color: ${COLOR.PRIMARY};
`;

export const CountDownTimer = ({ mm, ss, restart }: TimerProps) => {
  const [minutes, setMinutes] = useState<number>(mm);
  const [seconds, setSeconds] = useState<number>(ss);

  useEffect(() => {
    let id: NodeJS.Timeout;
    const countdown = () => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(id);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    };
    id = setInterval(countdown, 1000);
    return () => clearInterval(id);
  }, [minutes, seconds]);

  useEffect(() => {
    if (restart) {
      setMinutes(mm);
      setSeconds(ss);
    }
  }, [mm, restart, ss]);

  return (
    <CountDownSpan>
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </CountDownSpan>
  );
};
