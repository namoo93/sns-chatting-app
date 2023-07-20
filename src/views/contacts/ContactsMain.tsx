import { IconButton } from 'components/atom';
import NavbarLayout from 'components/layouts/NavbarLayout';
import MyContactsInfo from './components/molecules/MyContactsInfo';
import { MainHeader, SearchBar } from 'components/molecules';
import styled from 'styled-components';
import { ContactsList, NoContacts } from './components/molecules';
import { useMemo, useState } from 'react';
import { dynamicSort } from 'utilites';
import { FeatureContactsList, FriendsContactsList } from './components/organisms';
import { useNavigate } from 'react-router-dom';
import { Row } from 'components/layouts';
import { NoResults } from 'components/molecules/no_results';
import { Tooltip } from 'components/atom/tooltip';
import useFetch from 'net/useFetch';
import SwrContainer from 'components/containers/SwrContainer';
import { useTranslation } from 'react-i18next';

const StyledRow = styled(Row)`
  padding: 16px 24px 16px 0px;
  margin: 10px 0 20px;
`;

const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
  background-color: #f8f8f8;
  z-index: 1000;
`;

export const ContactsMain = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [toggleFriendsEdit, setToggleFriendsEdit] = useState<boolean>(false);
  const [toggleBirth, setToggleBirth] = useState<boolean>(true);
  const [toggleFavorites, setToggleFavorites] = useState<boolean>(true);

  const [searchState, setSearchState] = useState<boolean>();
  const [searchValue, setSearchValue] = useState<string>('');

  const { data: totalContacts, mutate: mutateTotal } = useFetch('/auth/contacts');
  const { data: birthDayContacts } = useFetch('/auth/contacts/birthday');
  const { data: favoritesContacts } = useFetch('/auth/contacts/favorites');
  const { data: myInfo } = useFetch('/auth/me');

  const _totalContacts = useMemo(() => {
    let arr: any = [];
    totalContacts?.forEach((contact) => {
      let obj = {};
      obj = {
        ...contact,
        ...contact.friend,
        ...{
          name: `${contact.friend.first_name} ${contact.friend.last_name}`,
        },
      };
      delete obj['friend'];
      arr.push(obj);
    });
    return toggleFriendsEdit ? arr.sort(dynamicSort('name')) : arr.sort(dynamicSort('name')).filter((el) => !el.block);
  }, [toggleFriendsEdit, totalContacts]);

  const _birthDayContacts = useMemo(() => {
    let arr: any = [];
    birthDayContacts?.forEach((contact) => {
      let obj = {};
      obj = {
        ...contact,
        ...contact.friend,
        ...{
          name: `${contact.friend.first_name} ${contact.friend.last_name}`,
        },
      };
      delete obj['friend'];
      arr.push(obj);
    });
    return arr.sort(dynamicSort('name'));
  }, [birthDayContacts]);

  const _favoritesContacts = useMemo(() => {
    let arr: any = [];
    favoritesContacts?.forEach((contact) => {
      let obj = {};
      obj = {
        ...contact,
        ...contact.friend,
        ...{
          name: `${contact.friend.first_name} ${contact.friend.last_name}`,
        },
      };
      delete obj['friend'];
      arr.push(obj);
    });
    return arr.sort(dynamicSort('name'));
  }, [favoritesContacts]);

  const searchContactsList = _totalContacts.filter((item: any) => {
    return (
      item.uid.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  return (
    <NavbarLayout color={'#f8f8f8'} themeColor={false} scroll>
      <StickyWrapper>
        <MainHeader
          title={`${t('contact.Contacts')}`}
          button={[
            <IconButton
              key={1}
              width={22}
              marginLeft={20}
              iconName={'ic-search-22'}
              backgroundColor={'#f8f8f8'}
              iconOnly
              onClick={() => setSearchState(!searchState)}
            />,
            <>
              <Tooltip
                x={12}
                y={35}
                width={103}
                visible={_totalContacts.length === 0 && true}
                hDirection="right"
                text={`${t('contact.Add friends')}!`}
              />
            </>,
            <IconButton
              key={2}
              width={22}
              marginLeft={20}
              iconName={'ic-add-22'}
              backgroundColor={'#f8f8f8'}
              iconOnly
              onClick={() => navigate('/contacts/add-friends')}
            />,
          ]}
        />
      </StickyWrapper>
      <MyContactsInfo data={myInfo} />
      {searchState && (
        <Row>
          <SearchBar
            onChange={(value) => setSearchValue(value)}
            placeholder={`${t('contact.Search within your contact list')}`}
            value={searchValue}
          />
          <StyledRow>
            <IconButton
              key={3}
              iconWidth={16}
              iconHeight={16}
              width={16}
              iconName={'ic-search-close'}
              backgroundColor={'#f8f8f8'}
              iconOnly
              onClick={() => setSearchState(!searchState)}
            />
          </StyledRow>
        </Row>
      )}
      {searchState ? (
        <>
          {(searchValue && searchContactsList.length) || !searchValue ? (
            <ContactsList data={searchContactsList} searchValue={searchValue} />
          ) : (
            <NoResults searchValue={searchValue} />
          )}
        </>
      ) : (
        <>
          {_totalContacts.length === 0 && <NoContacts />}
          {_totalContacts.length > 0 && (
            <>
              <SwrContainer data={birthDayContacts}>
                <FeatureContactsList
                  data={_birthDayContacts}
                  toggle={toggleBirth}
                  setToggle={setToggleBirth}
                  title={`${t('contact.Friends with Birthday')}`}
                />
              </SwrContainer>
              <SwrContainer data={favoritesContacts}>
                <FeatureContactsList
                  data={_favoritesContacts}
                  toggle={toggleFavorites}
                  setToggle={setToggleFavorites}
                  title={`${t('contact.Favorites')}`}
                />
              </SwrContainer>
              <SwrContainer data={totalContacts}>
                <FriendsContactsList
                  data={_totalContacts}
                  toggle={toggleFriendsEdit}
                  setToggle={setToggleFriendsEdit}
                  reload={() => mutateTotal()}
                />
              </SwrContainer>
            </>
          )}
        </>
      )}
    </NavbarLayout>
  );
};

export default ContactsMain;
