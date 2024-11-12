import { internalMutation, mutation, query } from './_generated/server';
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
      hidden: false,
    });
    return id;
  },
});

export const updateAllHiddenToFalse = internalMutation({
  args: {},
  handler: async (ctx) => {
    const prompts = await ctx.db.query('prompts').collect();
    for (const prompt of prompts) {
      if (typeof prompt.hidden === 'undefined') {
        await ctx.db.patch(prompt._id, { hidden: false });
      }
    }
  },
});

export const getAllPrompts = query({
  args: {},
  handler: async (ctx) => {
    const prompts = await ctx.db
      .query('prompts')
      .withIndex('by_hidden', (q) => q.eq('hidden', false))
      .order('desc')
      .take(5);

    return prompts.map((prompt) => ({
      prompt: prompt.prompt.length > 100 ? prompt.prompt.substring(0, 100) + '...' : prompt.prompt,

      email: `${prompt.email[0]}****${prompt.email.substring(prompt.email.indexOf('@'))}`,
    }));
  },
});

export const getAllPromptsCount = query({
  args: {},
  handler: async (ctx) => {
    return (await ctx.db.query('prompts').collect()).length + 151;
  },
});
