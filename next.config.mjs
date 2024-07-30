/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['directory-curatd.s3.us-east-2.amazonaws.com'],
  },
};

export default nextConfig;
