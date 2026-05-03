import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/** All published posts, newest first (public) */
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_published", (q) => q.eq("published", true))
      .order("desc")
      .take(50);
  },
});

/** Single post by slug (public) */
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

/** Single post by ID (public) */
export const get = query({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

/** All posts by a specific author */
export const listByAuthor = query({
  args: { authorId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_authorId", (q) => q.eq("authorId", args.authorId))
      .order("desc")
      .take(50);
  },
});

/** Create a post — authorId is derived from the authenticated user */
export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.optional(v.string()),
    content: v.string(),
    img: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    published: v.boolean(),
    publishedAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (!user) throw new Error("User not found");

    return await ctx.db.insert("posts", {
      ...args,
      authorId: user._id,
      publishedAt: args.published ? args.publishedAt ?? Date.now() : undefined,
    });
  },
});

/** Toggle published status */
export const setPublished = mutation({
  args: { id: v.id("posts"), published: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      published: args.published,
      publishedAt: args.published ? Date.now() : undefined,
    });
  },
});
