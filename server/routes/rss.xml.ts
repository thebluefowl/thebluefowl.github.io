import { serverQueryContent } from "#content/server";

const SITE_URL = "https://vishnujayadevan.com";
const SITE_TITLE = "Vishnu Jayadevan";
const SITE_DESC =
  "Writing on software engineering, distributed systems, and the occasional detour.";

const escapeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export default defineEventHandler(async (event) => {
  const docs = await serverQueryContent(event, "/blog")
    .sort({ date: -1 })
    .find();

  const posts = docs.filter((d: any) => d.title && d._path && !d._path.endsWith("/_dir"));

  const items = posts
    .map((p: any) => {
      const url = `${SITE_URL}${p._path}`;
      const pubDate = p.date ? new Date(p.date).toUTCString() : new Date().toUTCString();
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      ${p.category ? `<category>${escapeXml(p.category)}</category>` : ""}
      <description>${escapeXml(p.description || "")}</description>
    </item>`;
    })
    .join("\n");

  const lastBuildDate = posts[0]?.date
    ? new Date(posts[0].date).toUTCString()
    : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESC}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  setHeader(event, "content-type", "application/xml; charset=utf-8");
  return xml;
});
