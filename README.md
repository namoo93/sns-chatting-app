# 콕콕 메신저 데스크탑

## 필요한 것들

* Node.js LTS 이상

## Install

```shell
yarn
```

## 개발 모드로 실행

### 웹 실행

웹만 실행한 다음 http://localhost:3000 경로에서 확인할 수 있습니다.

```shell
yarn start
# 윈도의 경우
yarn start-win
```

### 앱으로 실행

앱으로 실행해 확인할 수 있습니다.  
개발 모드일 때는 앱 내에서 http://localhost:3000 경로를 웹뷰로 보여주므로, 자동 새로고침 등의 효과를 동일하게 경험할 수 있습니다.

일부 기능은 앱에서만 동작하는 것도 있으므로 가능하면 앱에서의 실행과 테스트를 권장힙낟.

```shell
yarn start-electron
# 윈도의 경우
yarn start-electron-win
```

## 개발 가이드

* [API 통신 가이드](./guides/api-guide.md)
* [전역 상태 관리](./guides/global-statement.md)
