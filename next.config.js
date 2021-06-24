const nextConfig = {
  future: { webpack5: true },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.experiments = {
  	  asyncWebAssembly: true
  	};
    return config;
  },
};

module.exports = nextConfig;
