/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/jbejar/voteforjonathan' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
module.exports = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
};