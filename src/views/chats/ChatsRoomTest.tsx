import React from 'react';
import faker from 'faker';
import { range } from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';

const generateRand = arg => {
  return Math.floor(Math.random() * arg);
};

export const getRandomHeight = () => generateRand(100);

export const makeItem = (startOffset = 0) => ({
  id: startOffset,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  height: getRandomHeight(),
});

export const makeItems = (startOffset = 0, size = 15) =>
  range(startOffset, size).map(idx => ({
    id: idx,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    height: getRandomHeight(),
  }));

const Timeline = ({ items, fetch, innerRef, disabled }: any) => {
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 300,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
      }}
      ref={innerRef}>
      <InfiniteScroll
        dataLength={items.length}
        next={fetch}
        style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
        inverse={true}
        hasMore={true && !disabled}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv">
        {items.map((item, index) => (
          <div key={index}>{index}</div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Timeline;
