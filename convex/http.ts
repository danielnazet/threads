import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { httpRouter } from "convex/server";

const http = httpRouter();

export const handleClerkWebhook = httpAction(async (ctx, request) => {
	const { data, type } = await request.json();

	switch (type) {
		case "user.created":
			await ctx.runMutation(internal.users.createUser, {
				clerkId: data.id,
				email: data.email_addresses[0].email_address,
				first_name: data.first_name,
				last_name: data.last_name,
				imageUrl: data.image_url,
				username: data.username,
				followersCount: 0,
			});
			break;
		case "user.updated":
			console.log("User updated");
			break;
	}
	return new Response(null, { status: 200 });
});
http.route({
	path: "/clerk-users-webhook",
	method: "POST", //   method
	handler: handleClerkWebhook,
});

// https://hushed-seal-187.convex.cloud
// https://hushed-seal-187.convex.site/clerk-users-webhook

export default http;
