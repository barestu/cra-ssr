import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodosQuery } from '../store/actions';

const Todos = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.todos);

  useEffect(() => {
    dispatch(fetchTodosQuery('todos'));
  }, []);

  return (
    <div>
      <h1>Todos</h1>
      <ul>{data.map(item => <li key={`todo-${item.id}`}>{item.title}</li>)}</ul>
    </div>
  );
};

Todos.loadData = store => {
  return store.dispatch(fetchTodosQuery('todos'));
};

export default Todos;
