import { it } from "node:test";
import { strictEqual } from "node:assert";
import { defaultSocialMeta, DEFAULT_SOCIAL_IMAGE } from "./social-metadata";

it("restores exactly one OG and Twitter default to the previous public image", () => {
  const tags = defaultSocialMeta();
  strictEqual(tags.filter((tag) => tag.property === "og:image").length, 1);
  strictEqual(tags.filter((tag) => tag.name === "twitter:image").length, 1);
  strictEqual(tags[0].content, "https://storage.googleapis.com/gpt-engineer-file-uploads/W9n5Kdaih9fbHjJwkOFRnLpRHoz1/social-images/social-1780607679512-Imagen_Google_Workspace.webp");
  strictEqual(tags[1].content, DEFAULT_SOCIAL_IMAGE);
});