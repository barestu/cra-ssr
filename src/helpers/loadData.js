import axios from 'axios';

const loadData = resourceType => {
  return axios(`https://jsonplaceholder.typicode.com/${resourceType}`).then(res => {
    return res.data.filter((_, idx) => idx < 10);
  });
};

export default loadData;
