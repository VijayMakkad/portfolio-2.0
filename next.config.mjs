import mdx from '@next/mdx';

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  transpilePackages: ['next-mdx-remote'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.shields.io',
        pathname: '/**',
      },
    ],
  },
  sassOptions: {
    compiler: 'modern',
    silenceDeprecations: ['legacy-js-api', 'import'],
  },
};

export default withMDX(nextConfig);
