import React from 'react';

const Posts = () => {
  return <div>Posts page</div>;
};

Posts.loadData = () => {
  return Promise.resolve(null);
};

export default Posts;
