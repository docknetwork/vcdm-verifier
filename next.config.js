const debug = process.env.NODE_ENV !== "production";

module.exports = {
  assetPrefix: debug ? '' : '/issuing-verification-app/',
  experimental: {
    basePath: debug ? '' : '/issuing-verification-app',
  },
};
