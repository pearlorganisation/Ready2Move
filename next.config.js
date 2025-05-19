const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      }
    ]
  },
  // Required for Canvas to work with Next.js
  //  serverExternalPackages: ['@napi-rs/canvas'],

};

export default nextConfig;