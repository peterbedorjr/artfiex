import assets from '@artifexweb/core/scripts/assets';
import createRouteHandler from '@artifexweb/core/scripts/createRouteHandler';

export default createRouteHandler(async () => {
    assets.load({
        root: 'https://cdnjs.cloudflare.com/ajax/libs',
        files: [
            '/mapbox-gl/1.13.2/mapbox-gl.js',
            '/hover.css/2.3.1/css/hover-min.css',
        ],
    });
});
