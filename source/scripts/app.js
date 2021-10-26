import Navigo from 'navigo';
import '../styles/app.scss';

const router = new Navigo('/');

router.on({
    '/': () => import('./pages/Home'),
}).resolve();
