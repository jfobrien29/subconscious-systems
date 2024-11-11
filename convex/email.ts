import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const saveEmailAndPrompt = mutation({
  args: {
    email: v.string(),
    prompt: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert('prompts', {
      email: args.email,
      prompt: args.prompt,
      status: 'pending',
    });
    return id;
  },
});

export const getAllPrompts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('prompts').order('desc').take(20);
  },
});

export const getAllPromptsCount = query({
  args: {},
  handler: async (ctx) => {
    return (await ctx.db.query('prompts').collect()).length;
  },
});
