// 특수문자 체크 정규식
export const specialCharactersRegExp = /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g;

// 영문 체크 정규식
export const alphabetRegExp = /[a-zA-Z]/;

// 모든 공백 체크 정규식
export const blankCheckRegExp = /\s/g;

// 숫자만 체크 정규식
export const numberRegExp = /[0-9]/g;

// 이메일 체크 정규식
export const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

// 핸드폰번호 정규식
export const phoneNumberRegExp = /^\d{3}-\d{3,4}-\d{4}$/;

// 휴대폰번호 체크 정규식
export const phoneNumberCheckRegExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;

// kokkok name 체크 정규식
export const kokkokNameRegExp = /[_.a-z0-9]{1,40}$/g;
