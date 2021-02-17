import Home from './Home';
import Posts from './Posts';
import Todos from './Todos';
import NotFound from './NotFound';

const Routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/posts',
    component: Posts,
    loadData: Posts.loadData,
  },
  {
    path: '/todos',
    component: Todos,
    loadData: Todos.loadData,
  },
  {
    component: NotFound,
  },
];

export default Routes;
