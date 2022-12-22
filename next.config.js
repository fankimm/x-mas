/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    TEST_KEY: process.env.TEST_KEY,
  },
};

module.exports = nextConfig;
