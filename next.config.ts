// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images:{
//     remotePatterns: [
//       {
//          protocol: 'https',
//         hostname: 'res.cloudinary.com',
//       }
//     ]
//   },
  
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      }
    ]
  },
  // Required for Canvas to work with Next.js
   serverExternalPackages: ['@napi-rs/canvas'],

};

export default nextConfig;