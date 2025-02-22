/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // SSGではnext/imageが利用できない。今回はunoptimizedで割愛
  images: {
    unoptimized: true,
  },
  transpilePackages: ["three"],
};

module.exports = nextConfig;
