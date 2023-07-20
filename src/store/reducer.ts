import { combineReducers } from '@reduxjs/toolkit';
import { reducer as test } from 'modules/test';
import { reducer as chats } from 'modules/chats/redux';
import { reducer as messages } from 'modules/chats/rooms/messages/redux';

const reducer = combineReducers({
  test,
  chats,
  messages,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
