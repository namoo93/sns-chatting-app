import {useState, useEffect} from 'react';
import styled from 'styled-components';

import MainLayout from 'components/layouts/MainLayout';
import {SearchBar, TitleHeader} from 'components/molecules';
import {Messages} from 'views/more/components';
import {NoResults} from 'components/molecules/no_results';

const RestyledMainLayout = styled(MainLayout)`
  height: 100vh;
  overflow: hidden;
  width: 100%;
`;

const Inner = styled.div`
  height: calc(100vh - 150px);
  width: 100%;
`;

const dummy = [
  {
    id: 1,
    avatar: 'https://placeimg.com/40/40/people',
    name: 'Boummaly Sayasone',
    date: 'Nov 23, 2021 at 11:40 AM',
    content:
      "Jim Cukrov's parents moved to Wattleup in the 1950s after emigrating from Yugoslavia, built a house, and established a market garden on a 5-acre plot.\n" +
      'Jim remembers a tight-knit community with many neighbours who also came from Europe and a life that revolved around home and the market gardens.',
    bookmarked: true,
  },
  {
    id: 2,
    avatar: 'https://placeimg.com/40/40/people',
    name: 'Aaysone Kim',
    date: 'Nov 23, 2021 at 11:40 AM',
    content:
      'The United Nations General Assembly has voted overwhelmingly to condemn Russia\'s invasion of Ukraine "in the strongest terms".\n' +
      '\n' +
      'Titled "Aggression against Ukraine", the resolution demanded an immediate halt to the offensive and the withdrawal of all Russian troops.\n' +
      '\n' +
      "It was backed by 141 of the assembly's 193 members, with five votes against the resolution and 35 abstentions.",
    bookmarked: true,
  },
  {
    id: 3,
    avatar: 'https://placeimg.com/40/40/people',
    name: 'Kim',
    date: 'Nov 23, 2021 at 11:40 AM',
    content:
      'The United Nations General Assembly has voted overwhelmingly to condemn Russia\'s invasion of Ukraine "in the strongest terms".\n' +
      '\n' +
      'Titled "Aggression against Ukraine", the resolution demanded an immediate halt to the offensive and the withdrawal of all Russian troops.\n' +
      '\n' +
      "It was backed by 141 of the assembly's 193 members, with five votes against the resolution and 35 abstentions.",
    bookmarked: true,
  },
  {
    id: 4,
    avatar: 'https://placeimg.com/40/40/people',
    name: 'Lee',
    date: 'Nov 23, 2021 at 11:40 AM',
    content:
      'The United Nations General Assembly has voted overwhelmingly to condemn Russia\'s invasion of Ukraine "in the strongest terms".\n' +
      '\n' +
      'Titled "Aggression against Ukraine", the resolution demanded an immediate halt to the offensive and the withdrawal of all Russian troops.\n' +
      '\n' +
      "It was backed by 141 of the assembly's 193 members, with five votes against the resolution and 35 abstentions.",
    bookmarked: true,
  },
  {
    id: 5,
    avatar: 'https://placeimg.com/40/40/people',
    name: 'Lee',
    date: 'Nov 23, 2021 at 11:40 AM',
    content:
      'The United Nations General Assembly has voted overwhelmingly to condemn Russia\'s invasion of Ukraine "in the strongest terms".\n' +
      '\n' +
      'Titled "Aggression against Ukraine", the resolution demanded an immediate halt to the offensive and the withdrawal of all Russian troops.\n' +
      '\n' +
      "It was backed by 141 of the assembly's 193 members, with five votes against the resolution and 35 abstentions.",
    bookmarked: true,
  },
  {
    id: 6,
    avatar: 'https://placeimg.com/40/40/people',
    name: 'Lee',
    date: 'Nov 23, 2021 at 11:40 AM',
    content:
      'The United Nations General Assembly has voted overwhelmingly to condemn Russia\'s invasion of Ukraine "in the strongest terms".\n' +
      '\n' +
      'Titled "Aggression against Ukraine", the resolution demanded an immediate halt to the offensive and the withdrawal of all Russian troops.\n' +
      '\n' +
      "It was backed by 141 of the assembly's 193 members, with five votes against the resolution and 35 abstentions.",
    bookmarked: true,
  },
];
export const SavedMessages = () => {
  const [dummyMsg, setDummyMsg] = useState<any[]>(dummy);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    setDummyMsg(
      dummy.filter(msg =>
        msg.content.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    );
  }, [searchValue]);

  const onClick = (id, bookmarked) => {
    setDummyMsg(
      dummyMsg.map(msg =>
        msg.id === id ? {...msg, bookmarked: !bookmarked} : msg,
      ),
    );
  };

  return (
    <RestyledMainLayout>
      <TitleHeader title="Saved Messages" />
      <Inner>
        <SearchBar
          onChange={value => setSearchValue(value)}
          placeholder="Search messages"
          value={searchValue}
        />
        {(searchValue &&
          dummy.filter(msg =>
            msg.content.toLowerCase().includes(searchValue.toLowerCase()),
          ).length) ||
        !searchValue ? (
          <Messages data={dummyMsg} onClick={onClick} />
        ) : (
          <NoResults searchValue={searchValue} />
        )}
      </Inner>
    </RestyledMainLayout>
  );
};
