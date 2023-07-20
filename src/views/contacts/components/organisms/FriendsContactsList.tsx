import { Dispatch, SetStateAction } from 'react';
import { ContactsList } from '../molecules';
import styled from 'styled-components';
import { ALPHABET_LIST } from 'constants/CONST';
import { IconButton } from 'components/atom';
import { alphabetRegExp, specialCharactersRegExp } from 'constants/REGEXP';
import { IContact } from 'modules/contacts/types';
import { useTranslation } from 'react-i18next';

const ListHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 8px 20px;
  flex-direction: row;
  align-content: stretch;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  p {
    font-size: 13px;
    font-weight: 500;
    line-height: normal;
    letter-spacing: normal;
    color: #bbb;
    span {
      color: #f68722;
    }
  }
`;

const StickyHeader = styled(ListHeader)`
  position: sticky;
  height: 30px;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: #f8f8f8;
  top: 70px;
  cursor: initial;
`;

export type FriendsContactsListProps = {
  data?: IContact[];
  toggle?: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  reload: () => void;
};

export const FriendsContactsList = ({ data, toggle, setToggle, reload }: FriendsContactsListProps) => {
  const { t } = useTranslation();
  return (
    <>
      <ListHeader>
        <p>
          {t('contact.Friends')} <span>{data?.length}</span>
        </p>
        {toggle ? (
          <IconButton
            variant="text"
            height={12}
            onClick={() => {
              setToggle(!toggle);
              reload();
            }}
          >
            {t('button-common.Done')}
          </IconButton>
        ) : (
          <IconButton
            deepGrayText
            textMarginLeft={3}
            variant="text"
            iconWidth={12}
            iconHeight={12}
            height={12}
            iconName={'ic-edit-12'}
            backgroundColor={'#f8f8f8'}
            onClick={() => setToggle(!toggle)}
          >
            {t('button-common.Edit')}
          </IconButton>
        )}
      </ListHeader>

      {ALPHABET_LIST.map((alpha) => {
        let specialCharacterList: any[] = [];
        let normalCharacterList: any[] = [];

        data?.forEach((item: any) => {
          if (!alphabetRegExp.test(item.name?.charAt(0))) {
            specialCharacterList.push(item);
          }
          if (alpha.toLocaleLowerCase() === item.name?.charAt(0).toLocaleLowerCase()) {
            normalCharacterList.push(item);
          }
        });
        return (
          <>
            {specialCharactersRegExp.test(alpha) ? (
              <>
                {specialCharacterList.length !== 0 && (
                  <StickyHeader>
                    <p>
                      <span>{alpha}</span>
                    </p>
                  </StickyHeader>
                )}
                <ContactsList data={specialCharacterList} edit={toggle} />
              </>
            ) : (
              <>
                {normalCharacterList.length !== 0 && (
                  <StickyHeader>
                    <p>
                      <span>{alpha}</span>
                    </p>
                  </StickyHeader>
                )}
                <ContactsList data={normalCharacterList} edit={toggle} />
              </>
            )}
          </>
        );
      })}
    </>
  );
};
