import mitt from 'mitt'
import assets from '../core/scripts/assets';
import createRouteHandler from '../core/scripts/createRouteHandler';

export default createRouteHandler(async (route) => {
    emitter = mitt();

    emitter.on('test', () => {
        console.log('test 2');
    });

    assets.load({
        root: 'https://cdnjs.cloudflare.com/ajax/libs',
        files: [
            '/mapbox-gl/1.13.2/mapbox-gl.js',
            '/hover.css/2.3.1/css/hover-min.css',
        ],
        success() {
            emitter.emit('test');
        },
    });
});