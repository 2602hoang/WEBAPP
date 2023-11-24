const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware('/api/v1/auth/sign-in',{
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    );
    app.use(
        '/api',
        createProxyMiddleware('/api/v1/tables/all',{
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    );
    app.use(
        '/api',
        createProxyMiddleware('/api/v1/booking/table/preparing/',{
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    );
    
    app.use(
        '/api',
        createProxyMiddleware('/api/v1/booking/table/',{
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    );
  
    app.use(
        '/api',
        createProxyMiddleware('/api/v1/booking/accepted/?orderId=',{
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    );
    app.use(
        '/api',
        createProxyMiddleware('api/v1/auth/me',{
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    );
    app.use(
        '/api',
        createProxyMiddleware('/api/v1/bills/finished/',{
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    );
    // /api/v1/booking/rejected/?orderId=1
    app.use(
        '/api',
        createProxyMiddleware('/api/v1/booking/rejected/?orderId=',{
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    );
};