import { ORIGIN, RECIPE_REST_END_POINT } from './constants';

export const getApi = async (url: string): Promise<Response> => {
  return fetch(`${RECIPE_REST_END_POINT}${url}`, {
    method: 'GET',
    mode: 'cors',
    headers: new Headers({
      Authorization: '',
    }),
  });
};

export const postApi = async (url: string, body: any): Promise<Response> => {
  return fetch(`${RECIPE_REST_END_POINT}${url}`, {
    method: 'POST',
    body: JSON.stringify(body),
    mode: 'cors',
    headers: new Headers({
      Authorization: '',
      'Content-Type': 'application/json',
    }),
  });
};

export const deleteApi = async (url: string): Promise<Response> => {
  return fetch(`${RECIPE_REST_END_POINT}${url}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      Origin: ORIGIN,
      'Access-Control-Request-Method': 'DELETE',
    },
  });
};
