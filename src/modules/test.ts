import {createSlice} from '@reduxjs/toolkit';
import {takeLatest} from 'redux-saga/effects';
import apiManager from 'api-manager';
import {
  createPromiseSaga,
  reducerUtils,
  handleAsyncActions,
} from 'lib/asyncUtils';

//slice
type TestState = {
  test: any;
};
const slice = createSlice({
  name: 'test',
  initialState: {test: reducerUtils.initial()} as TestState,
  reducers: {
    test(state, action) {},
    testSuccess(state, action) {
      state.test = handleAsyncActions(action);
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;

//api
const api = {
  test: async () => {
    return await apiManager.get(`/?s=iron`);
  },
};

//saga
const testFunc = createPromiseSaga(slice.actions.test, api.test);

export function* testSaga() {
  yield takeLatest(slice.actions.test, testFunc);
}
