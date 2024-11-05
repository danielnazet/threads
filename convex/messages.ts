import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const addThreadMessage = mutation({
	args: {
		content: v.string(),
		mediaFiles: v.optional(v.array(v.string())),
		websiteUrl: v.optional(v.string()),
		threadId: v.optional(v.id("messages")),
	},
	handler: async (ctx, args) => {
		const user = await getCurrentUserOrThrow(ctx);

		return await ctx.db.insert("messages", {
			...args,
			userId: user._id,
			likeCount: 0,
			commentCount: 0,
			retweetCount: 0,
		});
	},
});
