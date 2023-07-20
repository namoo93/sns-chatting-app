import MySetting from 'MySetting';
import { connect, io, Socket } from 'socket.io-client';
import { DisconnectDescription } from 'socket.io-client/build/esm/socket';
import AuthUtil from './AuthUtil';
import LogUtil from './LogUtil';

type OnResponse = (res) => void;
type OnStartOrEnd = (util: ChatRoomListSocketUtil) => Promise<void>;
class ChatRoomListSocketUtil {
  socket?: Socket;
  prefix: string;
  constructor(prefix: string = '') {
    this.prefix = prefix;
  }

  onJoinRoomList(onJoinRoomListCallback: OnResponse) {
    if (this.socket && this.socket.connected) {
      this.socket.once('join-room-list', (res) => {
        LogUtil.info(`${this.prefix} [socketId:${this.socket?.id}] onJoinRoomList`);
        onJoinRoomListCallback(res);
      });
    }
  }
  onExitRoomList(onExitRoomListCallback: OnResponse) {
    if (this.socket && this.socket.connected) {
      this.socket.once('exit-room-list', (res) => {
        LogUtil.info(`${this.prefix} [socketId:${this.socket?.id}] onExitRoomList`);
        onExitRoomListCallback(res);
      });
    }
  }
  onChatRoomList(onChatRoomListCallback: OnResponse) {
    if (this.socket && this.socket.connected) {
      this.socket.on('chat-room-list', (res) => {
        LogUtil.info(`${this.prefix} [socketId:${this.socket?.id}] onChatRoomList`);
        onChatRoomListCallback(res);
      });
    }
  }
  onRooms(onRoomsCallback: OnResponse) {
    if (this.socket && this.socket.connected) {
      this.socket.on('rooms', (res) => {
        LogUtil.info(`${this.prefix} [socketId:${this.socket?.id}] onRooms`);
        onRoomsCallback(res);
      });
    }
  }

  async emitJoinRoomList() {
    const userId = AuthUtil.getUserId();
    if (userId && this.socket) {
      LogUtil.info(`${this.prefix} [socketId:${this.socket?.id}] emitJoinRoomList`);
      this.socket.emit('join-room-list', {
        user_id: userId,
      });
    }
  }
  async emitExitRoomList() {
    const userId = AuthUtil.getUserId();
    if (userId && this.socket) {
      LogUtil.info(`${this.prefix} [socketId:${this.socket?.id}] emitExitRoomList`);
      this.socket.emit('exit-room-list', {
        user_id: userId,
      });
    }
  }

  async emitRooms() {
    const userId = AuthUtil.getUserId();
    if (userId && this.socket) {
      LogUtil.info(`${this.prefix} [socketId:${this.socket?.id}] emitRooms`);
      this.socket.emit('rooms', {
        user_id: userId,
      });
    }
  }

  connect(): Promise<Socket> {
    return new Promise(async (resolve, reject) => {
      //연결하기
      this.socket = connect(MySetting.socketUrl, {
        transports: ['websocket'],
      });
      const timeoutId = setTimeout(() => {
        reject('connect time out error');
      }, 20 * 1000);
      this.socket.on('connect', () => {
        LogUtil.info(`${this.prefix} [socketId:${this.socket?.id}] connect`);
        clearTimeout(timeoutId);
        resolve(this.socket!);
      });
    });
  }

  close() {
    if (this.socket) {
      LogUtil.info(`${this.prefix} [socketId:${this.socket?.id}] close`);
      this.socket.on('disconnect', (disconnectReason, disconnectDiscription) => {
        LogUtil.info(`disconnect disconnectReason, disconnectDiscription `, [disconnectReason, disconnectDiscription]);
      });

      //연결끊기
      this.socket.removeAllListeners();
      this.socket.disconnect();
    }
  }
}

export default ChatRoomListSocketUtil;
