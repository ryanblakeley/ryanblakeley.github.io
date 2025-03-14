import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {
  contactForm: defineAction({
    accept: 'form',
    input: z.object({
      email: z.string().email(),
      message: z.string(),
    }),
    handler: async ({ email, message }) => { /* ... */ },
  })
}
