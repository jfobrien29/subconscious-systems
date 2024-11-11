import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  prompts: defineTable({
    email: v.string(),
    prompt: v.string(),
    status: v.string(),
  }).index('by_email', ['email']),
});
