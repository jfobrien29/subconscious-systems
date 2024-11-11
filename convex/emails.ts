import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const saveEmailAndMessage = mutation({
  args: {
    email: v.string(),
    message: v.optional(v.string()),
  },
  handler: async (ctx, { email, message }) => {
    const emailToLowerCase = email.toLowerCase();

    const id = await ctx.db.insert('emails', {
      email: emailToLowerCase,
      message: message || '',
    });
    return id;
  },
});
