import 'react-datepicker/dist/react-datepicker.css';

import { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

import { IconTypeButton } from 'components/atom';
import { Row } from 'components/layouts';
import { COLOR } from 'constants/COLOR';
import { InfoContainer, Title } from 'views/more/components/UserInfoInputs';

interface Props {
  onChange: (newBirthday: string) => void;
}

const Container = styled.div`
  width: 100%;
`;

export const Birthday = ({ onChange }: Props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [isInit, setIsInit] = useState(true);

  useEffect(() => {
    let month, date;
    const year = startDate.getFullYear().toString();

    month = startDate.getMonth() + 1;
    if (month < 10) month = `0${month}`;
    else month = month.toString();

    date = startDate.getDate();
    if (date < 10) date = `0${date}`;
    else date = date.toString();

    onChange(`${date}/${month}/${year}`);
  }, [onChange, startDate]);

  const handleChange = (date: Date) => {
    setStartDate(date);
    setIsInit(false);
  };

  return (
    <Container>
      <InfoContainer align="center" fullWidth justify="space-between">
        <Row fullWidth>
          <Title marginRight={40}>Birth</Title>
          <DatePicker
            customInput={<CustomInput isInit={isInit} />}
            dateFormat="dd.MM.yyyy"
            selected={startDate}
            onChange={handleChange}
          />
        </Row>
        <IconTypeButton iconSrc="icon/ic-move" iconType="svg" />
      </InfoContainer>
    </Container>
  );
};

interface ButtonProps {
  isInit: boolean;
  ref: any;
  onClick: () => void;
}

const Button = styled.button<ButtonProps>`
  color: ${({ isInit }) => (isInit ? COLOR.GRAY : COLOR.BLACK)};
  font-size: 16px;
`;

const CustomInput = forwardRef(({ isInit, value, onClick }: any, ref) => (
  <Button isInit={isInit} onClick={onClick} ref={ref}>
    {value}
  </Button>
));
