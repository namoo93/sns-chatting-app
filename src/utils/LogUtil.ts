import DateUtil from './DateUtil';

class LogUtil {
  static info(message: string, obj?) {
    if (obj) {
      const jsonObj =
        obj instanceof Map ? JSON.stringify(Object.fromEntries(obj), null, 2) : JSON.stringify(obj, null, 2);
      console.info(`${DateUtil.nowWithKST()}, ${message}, ${jsonObj}`);
    } else {
      console.info(`${DateUtil.nowWithKST()}, ${message}`);
    }
  }

  static error(message: string, obj?) {
    if (obj) {
      const jsonObj =
        obj instanceof Map ? JSON.stringify(Object.fromEntries(obj), null, 2) : JSON.stringify(obj, null, 2);
      console.error(`${DateUtil.nowWithKST()}, ${message}, ${jsonObj}`);
    } else {
      console.error(`${DateUtil.nowWithKST()}, ${message}`);
    }
  }
}

export default LogUtil;
