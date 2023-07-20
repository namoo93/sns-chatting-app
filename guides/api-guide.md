# API 통신 가이드

## useFetch + SwrContainer

기본적으로 GET 요청은 [SWR](https://swr.vercel.app)을 이용해 캐싱합니다.  
`useFetch` 훅을 이용하고 `SwrConainer` 컴포넌트를 이용하면 다음과 같이 쉽게 데이터 가져오기, 캐싱, 예외처리가 가능합니다.

```js
export default function Component() {
  const { data, error } = useFetch('/api/path');

  return (
    <SwrContainer data={data} error={error}>
      <Content data={data} />
    </SwrContainer>
  );
}
```

두 개 이상의 데이터를 불러온다면 명확한 네이밍을 사용하는 것이 좋습니다.

```js
const { data: postData, error: postError } = useFetch('/api/post');
const { data: commentsData, error: commentsError } = useFetch('/api/comments');

return (
  <>
    <SwrContainer data={postData} error={postError}>
      <Post data={postData} />
    </SwrContainer>
    <SwrContainer data={commentsData} error={commentsError}>
      <Comments data={commentsData} />
    </SwrContainer>
  </>
);
```

### 데이터 갱신

기본적으로 SWR은 데이터를 알아서 갱신하지만, 명시적으로 갱신을 해야 하는 상황들이 있습니다.

```js
const { data, error, mutate } = useFetch('/api/path');

return <button onClick={muate}>새로고침</button>;
```

## POST, PATCH, PUT, DELETE 요청

`net/rest/api` 내에 있는 `post`, `patch`, `put`, `remove` 함수를 사용합니다.

```js
// axios 사용시
const { data } = await axios.post('/api/create', { data: 'data' });
// post 사용시
const data = await post('/api/create', { data: 'data' });
```

두 함수는 별 차이가 없어 보이지만, `rest/api` 내의 함수들은 catch 처리를 추가로 하지 않아도 기본 에러 핸들러가 지정되어 있습니다.  
또한 `axios`의 경우 response 객체에서 data 객체를 따로 꺼내야 하지만, `rest/api` 내의 함수들은 기본적으로 `data`를 곧바로 반환합니다.

### remove

`delete`는 자바스크립트의 예약어이기 때문에, `DELETE` 요청의 경우 `remove` 라는 이름으로 함수가 만들어졌습니다.

### 타입 지정

기본적으로 다음과 같이 타입 지정이 없이 사용할 수 있습니다.

```js
post('/api/sign-up', { id: '', pw: '' });
```

타입을 지정한다면 정적 검사와 코드 어시스트를 받을 수 있어 더욱 좋습니다.

```js
// post<받는 데이터 타입, 보내는 데이터 타입>()
post < User, SignUpPayload > ('/api/sign-up', { id: '', pw: '' });
```

보내는 데이터 타입도 있는게 좋지만 당장 없다면 any 처리를 해주세요

```js
// TODO: Payload 타입 지정 필요 - TODO 코멘트를 달아둡시다
post < User, any > ('/api/sign-up', { id: '', pw: '' });
```
