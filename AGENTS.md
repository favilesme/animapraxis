# Architecture rules
- Keep legacy structured articles and approved Markdown articles as separate members of one article union, with a shared index; this preserves previous content while supporting complete semantic Markdown.
- Approved editorial Markdown is imported as build-time raw text and rendered with react-markdown plus remark-gfm; this preserves links, headings and tables without filesystem reads at runtime.
- Keep article metadata in a pure helper and sitemap URLs under the primary public origin; publication and modification timestamps must be page-specific editorial dates, not generation times.
- Restore shared social-image defaults through a leaf-route helper only; never emit image tags from __root, so article-specific previews stay unique.
- Serve the existing custom sitemap at the escaped filename `sitemap[.]xml.ts` so the public endpoint is `/sitemap.xml`; keep legacy `/sitemap/xml` reachable by permanent redirect.