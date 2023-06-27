import Home from '../views/pages/home_modified';
import Favorite from '../views/pages/favorite_modified';
import Detail from '../views/pages/detail_modified';

const routes = {
  '/': Home,
  '/favorite': Favorite,
  '/restaurant/:id': Detail,
};

export default routes;
