import Home from './pages/Home';
import Posts from './pages/Posts';
import Todos from './pages/Todos';
import NotFound from './pages/NotFound';

const routes = [
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

export default routes;
