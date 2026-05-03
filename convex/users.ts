import { mutation, query, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import type { Doc } from "./_generated/dataModel";

/**
 * Called on login — creates or updates the user record linked to the
 * authenticated identity. Safe to call on every sign-in.
 */
export const upsertFromAuth = internalMutation({
  args: {},
  handler: async (ctx): Promise<Doc<"users">> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (existing) {
      // Sync name/email from the auth provider on every login
      await ctx.db.patch(existing._id, {
        name: identity.name ?? existing.name,
        email: identity.email ?? existing.email,
      });
      return (await ctx.db.get(existing._id))!;
    }

    // First sign-in — create the user
    const id = await ctx.db.insert("users", {
      tokenIdentifier: identity.tokenIdentifier,
      name: identity.name ?? "Anonymous",
      email: identity.email,
      role: "user",
    });
    return (await ctx.db.get(id))!;
  },
});

/** Get the currently authenticated user's profile */
export const me = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    return await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
  },
});

/** Get any user's public profile by their user ID */
export const getProfile = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) return null;
    // Strip tokenIdentifier before returning — it's an internal field
    const { tokenIdentifier: _token, email: _email, role: _role, ...publicProfile } = user;
    return publicProfile;
  },
});

/** Update the current user's own profile */
export const updateProfile = mutation({
  args: {
    name: v.optional(v.string()),
    bio: v.optional(v.string()),
    avatar: v.optional(v.string()),
    website: v.optional(v.string()),
    location: v.optional(v.string()),
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

    // Only patch fields that were actually provided
    const updates: Partial<typeof args> = {};
    if (args.name !== undefined) updates.name = args.name;
    if (args.bio !== undefined) updates.bio = args.bio;
    if (args.avatar !== undefined) updates.avatar = args.avatar;
    if (args.website !== undefined) updates.website = args.website;
    if (args.location !== undefined) updates.location = args.location;

    await ctx.db.patch(user._id, updates);
  },
});
