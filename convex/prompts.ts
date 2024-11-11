import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const saveEmailAndPrompt = mutation({
  args: {
    email: v.string(),
    prompt: v.string(),
  },
  handler: async (ctx, { email, prompt }) => {
    const emailToLowerCase = email.toLowerCase();

    // First check if the email has already submitted 10 prompts
    const existingPrompts = await ctx.db
      .query('prompts')
      .withIndex('by_email', (q) => q.eq('email', emailToLowerCase))
      .collect();
    if (existingPrompts.length >= 10) {
      throw new Error('User has already submitted 10 prompts');
    }

    const id = await ctx.db.insert('prompts', {
      email: emailToLowerCase,
      prompt: prompt,
      status: 'pending',
    });
    return id;
  },
});

export const getAllPrompts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('prompts').order('desc').take(5);
  },
});

export const getAllPromptsCount = query({
  args: {},
  handler: async (ctx) => {
    return (await ctx.db.query('prompts').collect()).length;
  },
});
