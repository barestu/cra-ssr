import React, { useEffect, useState } from 'react';
import loadData from './helpers/loadData';

const Todos = ({ staticContext }) => {
  const [data, setData] = useState(staticContext?.data || []);

  useEffect(() => {
    loadData('todos').then(data => {
      setData(data);
    });
  }, []);

  return (
    <div>
      <h1>Todos</h1>
      <ul>{data && data.map(item => <li key={item.id}>{item.title}</li>)}</ul>
    </div>
  );
};

Todos.loadData = () => {
  return loadData('todos').then(data => {
    return data;
  });
};

export default Todos;
