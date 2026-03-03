import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://ready2move.co.in'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',             // Block the entire admin panel
        '/user/',              // Block user dashboard/profile areas (based on your folder structure)
        '/api/',               // Block backend API routes from being crawled
        
        // Auth Routes (It's best practice to keep bots out of login/register forms)
        '/login/',
        '/register/',
        '/forgotpassword/',
        '/resetpassword/',
        '/otpverification/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`, // Points bots to the sitemap we just created
  }
}