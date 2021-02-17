import axios from 'axios';

export const FETCH_TODOS = 'FETCH_TODOS';

export const fetchTodosQuery = type => async dispatch => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/${type}`);
  dispatch({
    type: FETCH_TODOS,
    payload: data,
  });
};
