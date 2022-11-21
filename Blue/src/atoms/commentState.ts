import {atom} from 'recoil';

export type Comment = {
  createdAt: Date;
  nickName: string;
  boardId: number;
  id: number;
  communityId: number;
  userId: number;
  content: string;
};

const commentState = atom<Comment | null>({
  key: 'commentState',
  default: null,
});

export default commentState;
