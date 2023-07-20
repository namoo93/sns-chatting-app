import React, { useState } from 'react';
import { ModalContext } from 'contexts/ModalContext';
import styled from 'styled-components';
import { COLOR } from 'constants/COLOR';
import { Button, ButtonVariant, Checkbox } from 'components/atom';
import { useTranslation } from 'react-i18next';

type DialogType = {
  onClick?: (checked?: boolean) => void;
  title?: any;
  text?: string;
  titleDesc?: string;
  buttonText1?: any;
  buttonText2?: any;
  isConfirm?: boolean;
  checkedOptionLabel?: string;
};

const DialogWrapper = styled.div`
  width: 300px;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const StyledTitle = styled.p`
  font-size: 14px;
  font-weight: bold;
  line-height: 1.53;
  color: ${COLOR.BLACK};
`;
const StyledTitleDesc = styled.p`
  font-size: 14px;
  font-weight: normal;
  line-height: 23px;
  color: ${COLOR.BLACK};
`;
const StyledText = styled.p`
  line-height: 1.46;
  font-size: 14px;
  margin-top: 7px;
  margin-bottom: 30px;
  letter-spacing: normal;
  text-align: center;
  color: ${COLOR.TEXT_GRAY};
`;

const StyledCheckboxWrapper = styled.div`
  line-height: 22px;
  font-size: 14px;
  letter-spacing: normal;
  text-align: center;
  color: ${COLOR.PRIMARY};
  margin: -30px 0 20px;
`;
export const Dialog: React.FC<DialogType> = ({
  onClick,
  title,
  text,
  titleDesc,
  buttonText1,
  buttonText2,
  isConfirm,
  checkedOptionLabel,
}) => {
  const { t } = useTranslation();
  let { closeModal } = React.useContext(ModalContext);
  const [checked, setChecked] = useState(false);

  return (
    <DialogWrapper>
      {titleDesc && <StyledTitleDesc>{titleDesc}</StyledTitleDesc>}
      {title && <StyledTitle>{typeof title === 'function' ? title() : title}</StyledTitle>}
      <StyledText>{text}</StyledText>
      {checkedOptionLabel && (
        <StyledCheckboxWrapper>
          <Checkbox
            id={'check'}
            value={'check'}
            marginRight={6}
            onClick={() => {
              setChecked(!checked);
            }}
          />
          {checkedOptionLabel}
        </StyledCheckboxWrapper>
      )}
      <ButtonsWrapper>
        {isConfirm ? (
          <Button
            className={'string'}
            type={'button'}
            onClick={() => {
              if (checkedOptionLabel) {
                onClick?.(checked);
              } else {
                onClick?.();
              }
            }}
            width={100}
            height={42}
            variant={ButtonVariant.Default}
            borderRadius
          >
            {!buttonText1 ? (
              <>
                {/* @ts-ignore */}
                {t('button-common.Confirm')}
              </>
            ) : (
              { buttonText1 }
            )}
          </Button>
        ) : (
          <>
            <Button
              className={'string'}
              type={'button'}
              onClick={() => {
                closeModal();
              }}
              width={100}
              height={42}
              marginRight={10}
              variant={ButtonVariant.Outlined}
              borderRadius
            >
              {!buttonText2 ? (
                <>
                  {/* @ts-ignore */}
                  {t('button-common.Cancel')}
                </>
              ) : (
                { buttonText2 }
              )}
            </Button>
            <Button
              className={'string'}
              type={'button'}
              onClick={() => {
                if (checkedOptionLabel) {
                  onClick?.(checked);
                } else {
                  onClick?.();
                }
              }}
              width={100}
              height={42}
              variant={ButtonVariant.Default}
              borderRadius
            >
              {!buttonText1 ? (
                <>
                  {/* @ts-ignore */}
                  {t('button-common.Confirm')}
                </>
              ) : (
                { buttonText1 }
              )}
            </Button>
          </>
        )}
      </ButtonsWrapper>
    </DialogWrapper>
  );
};
