export const secondsToTimestamp = seconds => {
  if (seconds === 0) {
    return `00:00`;
  }
  seconds = Math.floor(seconds);
  let m: number | string = Math.floor(seconds / 60);
  let s: number | string = seconds - m * 60;
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;
  return m + ':' + s;
};
