# 전역 상태 관리

## Jotai

전역 상태 관리는 [Jotai](https://jotai.org)를 이용해 이루어집니다.  
[Recoil](https://recoiljs.org)과 비슷한 방식이지만, 훨씬 간단합니다.

## 상태 객체 생성

`src/stores/` 디렉토리 아래에 `*Atom` 패턴으로 파일을 생성합니다.

예)

- src/stores/userAtom
- src/stores/tokenAtom

_주의 : 리덕스 레거시 코드가 있는 `src/store/`와 헷갈리지 않도록 주의하세요._

```js
import atom from 'jotai';

const userAtom = atom<User>();
export default userAtom;
```

## 상태 객체 사용

`src/stores/*Atom`을 import 해야 한다는 사실을 제외하면 `useState`와 사용법이 매우 흡사합니다.

`*Atom`에서 뒤에 `Atom`을 뗀 형태로 상태명을 사용합니다.  
상태 갱신을 위한 함수는 `set*` 같은 형태로 set 접두어를 사용합니다.

```js
import { useAtom } from 'jotai';
import userAtom from '../stores/userAtom';

export default function Component() {
  const [user, setUser] = useAtom(userAtom);

  return (
    <>
      <button
        onClick={() => {
          setUser({});
        }}>
        {user ? '마이 페이지' : '로그인'}
      </button>
    </>
  );
}
```

## 규칙

### 상태는 최대한 작게

전역 상태는 가능하면 작게 만들고, 여러개가 있는 형태가 바람직합니다.

```js
const [auth] = useAtom(authAtom);
console.log(auth.user.id);
console.log(auth.auth.token);
```

이런 형태로 auth 객체에 여러가지 정보가 담기는 것은 바람직하지 않습니다.  
차라리 다음과 같이 두 개로 나뉘는 것이 더 좋습니다.

```js
const [user] = useAtom(userAtom);
const [token] = useAtom(tokenAtom);
```

가능하면 primitive type의 상태를 만들어야 합니다.  
복잡한 상태를 만들어야 한다면 단일 타입을 가지는 형태가 되도록 합니다.

```js
// 전체 메뉴가 열렸는지 접혔는지
const foldAtom = atom<boolean>(false);
// 토큰 문자열
const tokenAtom = atom<string>('');
// 사용자 객체
const userAtom = atom<User>();
```

사용자 객체 같은 경우 `name`, `avatar` 등 수많은 필드를 가지고 있고, 사용 빈도가 높은 편이기 때문에 규칙에 맞춰 십수개의 상태로 분리하는 것이 비효율적이기 때문에 이런 경우에만 제한적으로 객체 유형의 상태를 허용합니다.
