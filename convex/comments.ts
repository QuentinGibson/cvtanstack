import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listByPost = query({
  args: { postSlug: v.string() },
  handler: async (ctx, { postSlug }) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_postSlug", (q) => q.eq("postSlug", postSlug))
      .order("asc")
      .take(500);

    return Promise.all(
      comments.map(async (c) => {
        const author = await ctx.db.get(c.authorId);
        return { ...c, author };
      }),
    );
  },
});

export const create = mutation({
  args: {
    postSlug: v.string(),
    content: v.string(),
    parentId: v.optional(v.id("comments")),
  },
  handler: async (ctx, { postSlug, content, parentId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Must be signed in to comment");

    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
    if (!user) throw new Error("User profile not found");

    let depth = 0;
    if (parentId) {
      const parent = await ctx.db.get(parentId);
      if (!parent) throw new Error("Parent comment not found");
      if (parent.depth >= 3) throw new Error("Maximum reply depth reached");
      depth = parent.depth + 1;
    }

    return ctx.db.insert("comments", {
      postSlug,
      authorId: user._id,
      content: content.trim(),
      parentId,
      depth,
    });
  },
});

export const remove = mutation({
  args: { commentId: v.id("comments") },
  handler: async (ctx, { commentId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const comment = await ctx.db.get(commentId);
    if (!comment) throw new Error("Comment not found");

    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
    if (!user) throw new Error("User profile not found");

    const isOwner = comment.authorId === user._id;
    const isModOrAdmin = user.role === "admin" || user.role === "mod";
    if (!isOwner && !isModOrAdmin) throw new Error("Unauthorized");

    await ctx.db.delete(commentId);
  },
});
