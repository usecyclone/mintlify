import BundleAnalyzer from '@next/bundle-analyzer';

const { ANALYZE, BASE_PATH } = process.env;

const withBundleAnalyzer = BundleAnalyzer({
  enabled: ANALYZE === 'true',
});

export default withBundleAnalyzer({
  swcMinify: true,
  optimizeFonts: false, // Required so Next Font works on Vercel
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
    disableStaticImages: true,
  },
  staticPageGenerationTimeout: 1000,
  experimental: {
    appDir: true,
    largePageDataBytes: 1024 * 1024 * 20, // 20 MB
  },
  basePath: BASE_PATH,
  async redirects() {
    return BASE_PATH
      ? [
          {
            source: '/',
            destination: BASE_PATH,
            basePath: false, // you can't write '/' as the source if you auto-prefix the base path to it
            permanent: true,
          },
        ]
      : [];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|avif|mp4)$/i,
      issuer: /\.(jsx?|tsx?|mdx?)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: { svgoConfig: { plugins: { removeViewBox: false } } },
        },
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    });
    return config;
  },
});
