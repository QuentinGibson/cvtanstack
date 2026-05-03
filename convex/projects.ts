import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/** All published projects (public) */
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_published", (q) => q.eq("published", true))
      .take(50);
  },
});

/** Single project by ID (public) */
export const get = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

/** All projects by a specific author */
export const listByAuthor = query({
  args: { authorId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_authorId", (q) => q.eq("authorId", args.authorId))
      .take(50);
  },
});

/** Create a project — authorId is derived from the authenticated user */
export const create = mutation({
  args: {
    title: v.string(),
    category: v.string(),
    img: v.string(),
    description: v.string(),
    client: v.optional(v.string()),
    date: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    isTall: v.optional(v.boolean()),
    isWide: v.optional(v.boolean()),
    published: v.boolean(),
    order: v.optional(v.number()),
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

    return await ctx.db.insert("projects", { ...args, authorId: user._id });
  },
});

/** Toggle published status */
export const setPublished = mutation({
  args: { id: v.id("projects"), published: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { published: args.published });
  },
});
