import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');

  const withAudio = posts
    .filter((post) => post.data.audio)
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  const siteUrl = context.site!.toString().replace(/\/$/, '');

  const items = withAudio.map((post) => {
    const pubDate = new Date(post.data.date).toUTCString();
    const audioUrl = post.data.audio!.startsWith('http')
      ? post.data.audio!
      : `${siteUrl}${post.data.audio}`;
    const link = `${siteUrl}/blog/${post.id}/`;

    return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <description>${escapeXml(post.data.description)}</description>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <enclosure url="${escapeXml(audioUrl)}" type="audio/mpeg" />
      <itunes:author>Stephen Sciortino</itunes:author>
      <itunes:subtitle>${escapeXml(post.data.description)}</itunes:subtitle>
      <itunes:summary>${escapeXml(post.data.description)}</itunes:summary>
      <itunes:explicit>false</itunes:explicit>
    </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Startup at the End of the Universe</title>
    <description>Dispatches from the final moments of spacetime on building something viable in an economy dominated by AI, consolidation, and the concentration of wealth.</description>
    <link>${siteUrl}</link>
    <language>en-us</language>
    <atom:link href="${siteUrl}/podcast.xml" rel="self" type="application/rss+xml" />
    <itunes:author>Stephen Sciortino</itunes:author>
    <itunes:owner>
      <itunes:name>Stephen Sciortino</itunes:name>
    </itunes:owner>
    <itunes:category text="Business">
      <itunes:category text="Entrepreneurship" />
    </itunes:category>
    <itunes:category text="Technology" />
    <itunes:explicit>false</itunes:explicit>
    <itunes:type>episodic</itunes:type>
    <itunes:summary>A small-business owner documents what it's like to build something viable in an economy dominated by AI, consolidation, and the concentration of wealth. Read aloud by the author from the final moments of spacetime.</itunes:summary>
${items.join('\n')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
