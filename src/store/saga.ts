import { all, fork } from 'redux-saga/effects';
import { testSaga } from 'modules/test';
import { messagesSaga } from 'modules/chats/rooms/messages/redux';

export default function* rootSaga() {
  yield all([fork(testSaga)]);
  yield all([fork(messagesSaga)]);
}
