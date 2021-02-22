import NotFound from './pages/NotFound';
import CustomLoadable from './components/CustomLoadable';

const routes = [
  {
    path: '/',
    exact: true,
    component: CustomLoadable({
      loader: () => import('./pages/Home'),
    }),
  },
  {
    path: '/posts',
    component: CustomLoadable({
      loader: () => import('./pages/Posts'),
    }),
  },
  {
    path: '/todos',
    component: CustomLoadable({
      loader: () => import('./pages/Todos'),
    }),
  },
  {
    component: NotFound,
  },
];

export default routes;
