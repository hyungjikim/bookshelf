import { z } from "zod";

export const bookDetailSchema = z.object({
  id: z.number(),
  book_id: z.number(),
  user_id: z.string().uuid(),
  content: z.string(),
  created_at: z.string(),
  user_name: z.string().nullable(),
});
