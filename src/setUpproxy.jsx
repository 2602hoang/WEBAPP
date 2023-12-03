const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//     app.use(
//         '/api',
//         createProxyMiddleware('/api/v1/auth/sign-in',{
//             target: 'https://food-delivery-api-f1u2.onrender.com',
//             changeOrigin: true,
//         })
//     );
//     app.use(
//         '/api',
//         createProxyMiddleware('/api/v1/tables/all',{
//             target: 'https://food-delivery-api-f1u2.onrender.com',
//             changeOrigin: true,
//         })
//     );
//     app.use(
//         '/api',
//         createProxyMiddleware('/api/v1/booking/table/preparing/',{
//             target: 'https://food-delivery-api-f1u2.onrender.com',
//             changeOrigin: true,
//         })
//     );
    
//     app.use(
//         '/api',
//         createProxyMiddleware('/api/v1/booking/table/',{
//             target: 'https://food-delivery-api-f1u2.onrender.com',
//             changeOrigin: true,
//         })
//     );
  
//     app.use(
//         '/api',
//         createProxyMiddleware('/api/v1/booking/accepted/?orderId=',{
//             target: 'https://food-delivery-api-f1u2.onrender.com',
//             changeOrigin: true,
//         })
//     );
//     app.use(
//         '/api',
//         createProxyMiddleware('api/v1/auth/me',{
//             target: 'https://food-delivery-api-f1u2.onrender.com',
//             changeOrigin: true,
//         })
//     );
//     app.use(
//         '/api',
//         createProxyMiddleware('/api/v1/bills/finished/',{
//             target: 'https://food-delivery-api-f1u2.onrender.com',
//             changeOrigin: true,
//         })
//     );
//     // /api/v1/booking/rejected/?orderId=1
//     app.use(
//         '/api',
//         createProxyMiddleware('/api/v1/booking/rejected/?orderId=',{
//             target: 'https://food-delivery-api-f1u2.onrender.com',
//             changeOrigin: true,
//         })
//     );
//     app.use(
//         '/api',
//         createProxyMiddleware('/api/v1/tables/status/false',{
//             target: 'https://food-delivery-api-f1u2.onrender.com',
//             changeOrigin: true,
//         })
//     );
//     app.use(
//         '/api',
//         createProxyMiddleware('/api/v1/tables/status/true',{
//             target: 'https://food-delivery-api-f1u2.onrender.com',
//             changeOrigin: true,
//         })
//     );
// };