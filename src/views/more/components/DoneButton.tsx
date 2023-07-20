import { Button, ButtonVariant } from 'components/atom';
import { useTranslation } from 'react-i18next';

export const DoneButton = () => {
  const { t } = useTranslation();
  return (
    <Button fontSize={14} grayText variant={ButtonVariant.Text} onClick={() => console.log('done')}>
      {t('button-common.Done')}
    </Button>
  );
};
