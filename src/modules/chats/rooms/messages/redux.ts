import { createSlice } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
import { createPromiseSaga, reducerUtils, handleAsyncActions } from 'lib/asyncUtils';
import { getMessages, getAllMessages, getSearchMessages } from './api';
import { MessageEntity } from './types';
type State = {
  data: {
    docs: MessageEntity[] | null;
    totalPages: number;
    nextPage: number | null;
    searchedDocs?: MessageEntity[];
  };
  loading: boolean;
  error: null;
};
const slice = createSlice({
  name: 'messages',
  initialState: {
    ...reducerUtils.initial(),
  } as State,
  reducers: {
    messages(state, action) {
      state.loading = true;
    },
    messagesSuccess(state, action) {
      state.loading = false;
      if (state.data && state.data.docs) {
        state.data = {
          ...handleAsyncActions(action).data,
          docs: [...state.data.docs, ...handleAsyncActions(action).data.docs],
        };
      } else {
        state.data = {
          ...handleAsyncActions(action).data,
          docs: [...handleAsyncActions(action).data.docs],
        };
      }
    },
    allMessages(state, action) {
      state.loading = true;
    },
    allMessagesSuccess(state, action) {
      state.data = {
        ...state.data,
        docs: [...handleAsyncActions(action).data],
        totalPages: 1,
        nextPage: null,
      };
      state.loading = false;
    },
    searchedMessages(state, action) {
      state.loading = true;
    },
    searchedMessagesSuccess(state, action) {
      state.data = {
        ...state.data,
        searchedDocs: [...handleAsyncActions(action).data],
      };
      state.loading = false;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;

const getMessagesFunc = createPromiseSaga(slice.actions.messages, getMessages);
const getAllMessagesFunc = createPromiseSaga(slice.actions.allMessages, getAllMessages);
const getSearchMessagesFunc = createPromiseSaga(slice.actions.searchedMessages, getSearchMessages);
export function* messagesSaga() {
  yield takeLatest(slice.actions.messages, getMessagesFunc);
  yield takeLatest(slice.actions.allMessages, getAllMessagesFunc);
  yield takeLatest(slice.actions.searchedMessages, getSearchMessagesFunc);
}
