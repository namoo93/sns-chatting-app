import MySetting from 'MySetting';
import { connect, io, Socket } from 'socket.io-client';
import { DisconnectDescription } from 'socket.io-client/build/esm/socket';
import { MessageType } from 'types/chats/rooms/messages/Message';
import Room, { CallType } from 'types/chats/rooms/Room';
import AuthUtil from './AuthUtil';
import LogUtil from './LogUtil';

type OnResponse = (res) => void;
class ChatRoomSocketUtil {
  static room: Room;

  // currentMessagePage:number = 0; //마지막 쿼리한 페이지
  // maxMessageCount:number = 0; //마지막 쿼리 메시지 총 개수.
  socket?: Socket;
  prefix: string;
  constructor(prefix: string = '') {
    this.prefix = prefix;
  }

  onJoinRoom(onJoinRoomCallback: OnResponse) {
    if (this.socket && this.socket.connected) {
      this.socket.once('join-room', (res) => {
        LogUtil.info(`${this.prefix} [socketId:${this.socket?.id}] onJoinRoom`);
        onJoinRoomCallback(res);
      });
    }
  }
  onExitRoom(onExitRoomCallback: OnResponse) {
    if (this.socket && this.socket.connected) {
      this.socket.once('exit-room', (res) => {
        LogUtil.info(`${this.prefix} [socketId:${this.socket?.id}] onExitRoom`);
        onExitRoomCallback(res);
      });
    }
  }
  onJoinCall(onJoinCallCallback: OnResponse, onJoinCallErrorCallback: OnResponse) {
    if (this.socket && this.socket.connected) {
      this.socket.on('join-call-error', (res) => {
        LogUtil.error(`${this.prefix} [socketId:${this.socket?.id}] onJoinCall error`, res);
        onJoinCallErrorCallback(res);
      });
      this.socket.on('join-call', (res) => {
        LogUtil.info(`${this.prefix} [socketId:${this.socket?.id}] onJoinCall`, res);
        onJoinCallCallback(res);
      });
    }
  }
  onExitCall(onExitCallCallback: OnResponse) {
    if (this.socket && this.socket.connected) {
      this.socket.on('exit-call-error', (res) => {
        LogUtil.error(`${this.prefix} [socketId:${this.socket?.id}] onExitCall error`, res);
      });
      this.socket.on('exit-call', (res) => {
        LogUtil.info(`${this.prefix} [socketId:${this.socket?.id}] onExitCall`);
        onExitCallCallback(res);
      });
    }
  }
  onChatRoom(onChatRoomCallback: OnResponse) {
    if (this.socket && this.socket.connected) {
      this.socket.on('chat-call-error', (res) => {
        LogUtil.error(`${this.prefix} [socketId:${this.socket?.id}] onChatRoom error`, res);
      });
      this.socket.on('chat-room', (res) => {
        LogUtil.info(`${this.prefix} [socketId:${this.socket?.id}] onChatRoom`);
        onChatRoomCallback(res);
      });
    }
  }
  onMessages(onMessagesCallback: OnResponse) {
    if (this.socket && this.socket.connected) {
      this.socket.on('messages-error', (res) => {
        LogUtil.error(`${this.prefix} [socketId:${this.socket?.id}] onMessages error`, res);
      });
      this.socket.on('messages', (res) => {
        LogUtil.info(`${this.prefix} [socketId:${this.socket?.id}] onMessages`);
        onMessagesCallback(res);
      });
    }
  }

  emitJoinRoom(roomId: string): void {
    if (this.socket && this.socket.connected) {
      LogUtil.info(`${this.prefix} [socketId:${this.socket?.id}] emitJoinRoom`);
      this.socket.emit('join-room', {
        room_id: roomId,
        user_id: AuthUtil.getUserId(),
      });
    }
  }
  emitExitRoom(roomId: string): void {
    if (this.socket && this.socket.connected) {
      LogUtil.info(`${this.prefix} [socketId:${this.socket?.id}] emitExitRoom`);
      this.socket.emit('exit-room', {
        room_id: roomId,
      });
    }
  }

  emitJoinCall(roomId: string, type: CallType): void {
    if (this.socket && this.socket.connected) {
      const param = {
        room_id: roomId,
        type: type,
      };
      LogUtil.info(`${this.prefix} [socketId:${this.socket?.id}] emitJoinCall`, param);
      this.socket.emit('join-call', param);
    }
  }

  emitExitCall(roomId: string): void {
    if (this.socket && this.socket.connected) {
      LogUtil.info(`${this.prefix} [socketId:${this.socket?.id}] emitExitCall`);
      this.socket.emit('exit-call', {
        room_id: roomId,
      });
    }
  }

  emitMessages(room_id: string, useRefresh: boolean = true): void {
    // if(useRefresh) {
    //   this.currentMessagePage = 0;
    // }

    const messageCount: number = 20; //메세지수
    if (this.socket && this.socket.connected) {
      LogUtil.info(`${this.prefix} [socketId:${this.socket?.id}] emitMessages`);
      const param = {
        room_id: room_id,
        user_id: AuthUtil.getUserId(),
        // ...(!useRefresh && this.currentMessagePage && { page: this.currentMessagePage++ }),
        // ...(!useRefresh && messageCount && { limit: messageCount }),
        // ...(useRefresh && { type: 'all' }),
        type: 'all',
      };
      LogUtil.info('emitMessages param', param);
      this.socket.emit('messages', param);
    }
  }

  emitChatRoom(
    room_id: string,
    sender_id: number,
    type: MessageType,
    content: string,
    reply_parent_message_id?: string,
  ) {
    //메시지 전송
    if (this.socket && this.socket.connected) {
      LogUtil.info(`${this.prefix} [socketId:${this.socket?.id}] emitChatRoom`);
      const param = {
        room_id: room_id,
        sender_id: sender_id,
        type: type,
        content: content,
        ...(reply_parent_message_id ? { reply_parent_message_id: reply_parent_message_id } : {}),
      };
      LogUtil.info('emitChatRoom param', param);
      this.socket.emit('chat-room', param);
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
    if (this.socket && this.socket.connected) {
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

export default ChatRoomSocketUtil;
