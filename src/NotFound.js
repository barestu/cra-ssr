import React from 'react';

const NotFound = ({ staticContext = {}}) => {
  staticContext.status = 404;
  return <h1>Oops, nothing here!</h1>;
};

export default NotFound;
