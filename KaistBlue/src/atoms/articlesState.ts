import {API_URL} from '@env';
import {selectorFamily} from 'recoil';

import {Article} from './articleState';
import userTokenState from './userTokenState';

const articlesState = selectorFamily({
  key: 'articlesState',
  get:
    communityId =>
    async ({get}) => {
      const response = await fetch(`${API_URL}/board/list`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${get(userTokenState)}`,
        },
        body: JSON.stringify({
          id: communityId,
        }),
      });
      const responseData = await response.json();
      return responseData.data as Article[];
    },
});

export default articlesState;
