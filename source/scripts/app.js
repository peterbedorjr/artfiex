import Navigo from 'navigo';
import Home from './pages/Home';
import User from './pages/User';

const router = new Navigo('/');

router.on({
    '/': Home,
    '/users/:user': User,
}).resolve();
