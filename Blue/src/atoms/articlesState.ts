import { selectorFamily } from 'recoil';

import { Article } from './articleState';
import userTokenState from './userTokenState';

const articlesState = selectorFamily({
  key: 'articlesState',
  get:
    clubId =>
    async ({get}) => {
      const response = await fetch('http://localhost:8091/board/list', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${get(userTokenState)}`,
        },
        body: JSON.stringify({
          id: clubId,
        }),
      });
      const responseData = await response.json();
      return responseData.data as Article[];
    },
});

export default articlesState;
