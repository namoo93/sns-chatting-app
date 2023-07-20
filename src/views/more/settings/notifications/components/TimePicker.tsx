import { Button, ButtonVariant } from 'components/atom';
import { ModalContext } from 'contexts';
import React, { useContext, useEffect, useState } from 'react';
import Picker from 'react-scrollable-picker';
import styled from 'styled-components';

//Picker css
const DoNotDisturbWrap = styled.div``;
const DoNotDisturb = styled.div`
  margin: -35px -15px;

  .picker-container .picker-inner {
    padding: 0;
    margin: 25px 48px 35px;

    .picker-column {
      width: 60px;
    }
  }
`;

const ButtonWrap = styled.div`
  margin: 50px 20px 0;
  display: flex;
  justify-content: space-between;
`;

const PickerTab = styled.div`
  margin: -35px -15px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 14px;
  color: #999;

  button {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ededed;
  }

  button.on {
    color: #f68722;
    font-weight: 500;
    border-bottom: 2px solid #f68722;
  }
`;

type TimeProps = {
  hour?: string;
  minute?: string;
  ampm?: string;
};

const TimePicker = ({ settingTime, setToggleDoNotDisturb }) => {
  const { closeModal } = useContext(ModalContext);
  const [fromTimes, setFromTimes] = useState<TimeProps>({
    hour: '01',
    minute: '00',
    ampm: 'AM',
  });
  const [toTimes, setToTimes] = useState<TimeProps>({
    hour: '01',
    minute: '00',
    ampm: 'AM',
  });

  const [inactive, setInactive] = useState<boolean>(false);
  useEffect(() => {
    if (JSON.stringify(fromTimes) === JSON.stringify(toTimes)) {
      setInactive(true);
    } else {
      setInactive(false);
    }
    console.log(inactive);
  }, [fromTimes, toTimes, inactive]);

  const hoursNum = Array.from({ length: 12 }, (v, i) =>
    i + 1 < 10 ? { value: `0${i + 1}`, label: `0${i + 1}` } : { value: `${i + 1}`, label: `${i + 1}` },
  );

  const minuteNum = Array.from({ length: 60 }, (v, i) =>
    i < 10 ? { value: `0${i}`, label: `0${i}` } : { value: `${i}`, label: `${i}` },
  );

  const optionGroups = {
    hour: hoursNum,
    minute: minuteNum,
    ampm: [
      { value: 'AM', label: 'AM' },
      { value: 'PM', label: 'PM' },
    ],
  };

  const [tab, setTab] = useState<'from' | 'to'>('from');

  const submitTimes = () => {
    setToggleDoNotDisturb(true); //토글
    console.log('result from:', fromTimes, 'to:', toTimes);
    closeModal();
  };

  return (
    <DoNotDisturbWrap>
      <PickerTab>
        <button className={tab === 'from' ? 'on' : ''} onClick={() => setTab('from')}>
          From
        </button>
        <button className={tab === 'to' ? 'on' : ''} onClick={() => setTab('to')}>
          To
        </button>
      </PickerTab>
      {tab === 'from' ? (
        <>
          <DoNotDisturb>
            <Picker
              optionGroups={optionGroups}
              valueGroups={fromTimes}
              onChange={(name, value) =>
                setFromTimes({
                  ...fromTimes,
                  [name]: value,
                })
              }
            />
          </DoNotDisturb>
        </>
      ) : (
        <>
          <DoNotDisturb>
            <Picker
              optionGroups={optionGroups}
              valueGroups={toTimes}
              onChange={(name, value) =>
                setToTimes({
                  ...toTimes,
                  [name]: value,
                })
              }
            />
          </DoNotDisturb>
        </>
      )}
      <ButtonWrap>
        <Button
          className={'string'}
          type={'button'}
          onClick={() => closeModal()}
          width={100}
          height={42}
          variant={ButtonVariant.Outlined}
          grayText
          borderRadius
        >
          Cancel
        </Button>
        <Button
          className={'string'}
          type={'button'}
          onClick={() => submitTimes()}
          width={100}
          height={42}
          variant={ButtonVariant.Default}
          inactive={inactive}
          borderRadius
        >
          OK
        </Button>
      </ButtonWrap>
    </DoNotDisturbWrap>
  );
};

export default TimePicker;
