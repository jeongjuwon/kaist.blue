import {atom} from 'recoil';

export type Club = {
  summary: string;
  sortNo: number;
  image: string;
  nickName: string;
  communityId: number;
  title: string;
  type: string;
  userId: number;
};

const clubState = atom<Club | null>({
  key: 'clubState',
  default: null,
});

export default clubState;
