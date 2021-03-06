const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/api',
        proxy({
            target: 'http://localhost:8081',
            changeOrigin: true
        })
    );
    app.use(
        '/authenticate',
        proxy({
            target: 'http://localhost:8081',
            changeOrigin: true
        })
    );
};