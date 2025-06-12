import { bookSchema } from "./../schemas/book";
import { z } from "zod";

export type Book = z.infer<typeof bookSchema>;
