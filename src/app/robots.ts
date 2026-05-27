import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://ready2move.co.in";

  return {
    rules: [
      {
        userAgent: "*",

        allow: [
          "/",
          "/_next/static/",
          "/_next/image/",
          "/images/",
          "/fonts/",
        ],

        disallow: [
          "/admin/",
          "/user/",
          "/api/",

          // Auth pages
          "/login/",
          "/register/",
          "/forgotpassword/",
          "/resetpassword/",
          "/otpverification/",
        ],
      },
    ],

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}