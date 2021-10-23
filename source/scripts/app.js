import Navigo from 'navigo';
// import 'lodash';
import Home from './pages/Home';
import User from './pages/User';
import '../styles/app.scss';

const router = new Navigo('/');

router.on({
    '/': Home,
    '/users/:user': User,
}).resolve();
