import { createFileRoute } from "@tanstack/react-router";

// Preserve links to the old incorrectly generated endpoint.
export const Route = createFileRoute("/sitemap/xml")({
  server: {
    handlers: {
      GET: () => new Response(null, { status: 301, headers: { Location: "https://animapraxis.org/sitemap.xml" } }),
    },
  },
});