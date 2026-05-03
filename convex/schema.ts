import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ── Users / Authors ───────────────────────────────────────────────────────
  users: defineTable({
    // Identity — linked to the auth provider's token
    tokenIdentifier: v.string(),  // from ctx.auth.getUserIdentity().tokenIdentifier

    // Public profile
    name: v.string(),
    email: v.optional(v.string()),
    bio: v.optional(v.string()),
    avatar: v.optional(v.string()),   // Convex storage ID or external URL
    website: v.optional(v.string()),
    location: v.optional(v.string()),

    // Role hierarchy: admin > mod > author > user
    role: v.union(v.literal("admin"), v.literal("mod"), v.literal("author"), v.literal("user")),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),

  // ── Projects ──────────────────────────────────────────────────────────────
  projects: defineTable({
    authorId: v.id("users"),        // foreign key → users
    title: v.string(),
    category: v.string(),
    img: v.string(),                // URL or Convex storage ID
    description: v.string(),
    client: v.optional(v.string()),
    date: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    isTall: v.optional(v.boolean()),
    isWide: v.optional(v.boolean()),
    published: v.boolean(),
    order: v.optional(v.number()),
  })
    .index("by_published", ["published"])
    .index("by_authorId", ["authorId"]),

  // ── Blog Posts ─────────────────────────────────────────────────────────────
  posts: defineTable({
    authorId: v.id("users"),        // foreign key → users
    title: v.string(),
    slug: v.string(),
    excerpt: v.optional(v.string()),
    content: v.string(),            // markdown or HTML
    img: v.optional(v.string()),    // cover image
    tags: v.optional(v.array(v.string())),
    published: v.boolean(),
    publishedAt: v.optional(v.number()),
  })
    .index("by_published", ["published"])
    .index("by_slug", ["slug"])
    .index("by_authorId", ["authorId"]),
});
