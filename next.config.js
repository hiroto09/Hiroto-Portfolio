/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    domains: ['images.microcms-assets.io'], // ホスト名を追加
  },
  transpilePackages: ["three"],
  env: {
    API_KEY: process.env.API_KEY, // API_KEYの環境変数を設定
  },
};

module.exports = nextConfig;
