class DateUtil {
  static nowWithKST(): Date {
    //한국 시간 출력
    /*
        Date.prototype.getTimezoneOffset()
        현재 사용자 PC 설정 시간대로부터 UTC 시간까지의 차이를 '분'단위로 반환한다.
        예를들어, 한국 시간은 UTC보다 9시간 빠르기 때문에 -540을 반환한다.
        */
    const now = new Date(); // 현재 시간
    const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000; // 현재 시간을 utc로 변환한 밀리세컨드값
    const koreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
    return new Date(utcNow + koreaTimeDiff); // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함
  }
}

export default DateUtil;
