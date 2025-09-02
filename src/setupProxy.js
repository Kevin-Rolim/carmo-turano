// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // rotas que o frontend chama
    createProxyMiddleware({
      target: 'http://localhost:3001', // seu backend real
      changeOrigin: true,
    })
  );
};
