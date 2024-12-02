import { createProxyMiddleware } from 'http-proxy-middleware';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default createProxyMiddleware({
  target: 'https://fantasy.premierleague.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/entry': '/api/entry',
  },
});
