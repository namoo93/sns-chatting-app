import { atom } from 'jotai';
import { OnRoomsType } from '../types/chats/rooms/Room';

const roomsAtom = atom<OnRoomsType | null>(null);

export default roomsAtom;
