const withImages = require('next-images');
const debug = process.env.NODE_ENV !== "production";

module.exports = withImages({
  assetPrefix: debug ? '' : '/issuing-verification-app/',
  experimental: {
    basePath: debug ? '' : '/issuing-verification-app',
  },
});
