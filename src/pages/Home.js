import React from 'react';
import Button from '../components/Button';

const Home = props => {
  return (
    <div>
      <h1>Hello {props.name}</h1>
      <Button>Button default</Button>
      <Button color="blue">Button blue</Button>
    </div>
  );
};

export default Home;
