import type { MetadataRoute } from 'next'
import "dotenv/config"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // disallow: '/lien-he/',
    },
    sitemap: [
      `${process.env.BASE_URL}/sitemap.xml`,
      `${process.env.BASE_URL}/du-an/sitemap.xml`,
      `${process.env.BASE_URL}/blog/sitemap.xml`
    ]

  }
}