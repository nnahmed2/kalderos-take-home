const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // Update this to the port the API is running on
      target: 'http://localhost:5282',
      changeOrigin: true,
    })
  );
};