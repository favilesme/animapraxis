// Restore the previous site-wide image at leaf routes, never at __root:
// root image tags can override or duplicate a child article's own preview.
export const DEFAULT_SOCIAL_IMAGE = "https://storage.googleapis.com/gpt-engineer-file-uploads/W9n5Kdaih9fbHjJwkOFRnLpRHoz1/social-images/social-1780607679512-Imagen_Google_Workspace.webp";

export function defaultSocialMeta() {
  return [
    { property: "og:image", content: DEFAULT_SOCIAL_IMAGE },
    { name: "twitter:image", content: DEFAULT_SOCIAL_IMAGE },
  ];
}