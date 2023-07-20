import { call, put } from 'redux-saga/effects';

export const createActionString = type => {
  return { success: `${type}Success`, error: `${type}Error` };
};

export const createPromiseSaga = (type, promiseCreator, stateType = null) => {
  const { success, error } = createActionString(type);

  return function* (action) {
    try {
      const response = yield call(promiseCreator, action.payload);
      const payload = stateType ? { ...response, stateType } : response;

      yield put({
        payload,
        type: success,
      });
    } catch (err: any) {
      const payload = stateType
        ? { msg: err.message, stateType }
        : { msg: err.message };

      yield put({
        type: error,
        error: true,
        payload,
      });
    }
  };
};
export const reducerUtils = {
  initial: (initialData: any = null) => ({
    loading: true,
    data: initialData,
    error: null,
  }),
  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null,
  }),
  success: payload => ({
    loading: false,
    data: payload,
    error: null,
  }),
  failure: error => ({
    loading: false,
    data: null,
    error: error,
  }),
};

export const handleAsyncActions = ({ type, payload = {} }, prevData = null) => {
  console.log(type);
  if (type.includes('Success')) {
    return reducerUtils.success(payload);
  }
  if (type.includes('Error')) {
    return reducerUtils.failure(payload);
  }
  return reducerUtils.loading(prevData);
};
