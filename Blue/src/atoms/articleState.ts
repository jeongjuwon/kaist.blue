import { atom } from 'recoil';

export type Article = {
  /// 게시물 제목
  title: string;
  /// 게시물 내용
  content: string;
  /// 생성일
  createdAt: Date;
  /// 클럽 아이디
  communityId: number;
  /// 닉네임
  nickName: string;
  /// 게시물 보드 아이디
  boardId: number;
};

const articleState = atom<Article | null>({
  key: 'articleState',
  default: null,
});

export default articleState;
