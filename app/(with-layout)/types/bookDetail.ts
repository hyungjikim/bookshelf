import { z } from "zod";
import { bookDetailSchema } from "../schemas/bookDetail";

export type BookDetail = z.infer<typeof bookDetailSchema>;
