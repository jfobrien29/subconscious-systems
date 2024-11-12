import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  prompts: defineTable({
    email: v.string(),
    prompt: v.string(),
    status: v.string(),
    hidden: v.boolean(),
  })
    .index('by_email', ['email'])
    .index('by_hidden', ['hidden']),
  emails: defineTable({
    email: v.string(),
    message: v.string(),
  }).index('by_email', ['email']),
});
