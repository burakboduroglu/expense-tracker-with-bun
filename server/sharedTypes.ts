import { z } from "zod";

export const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount"),
  title: z.string().min(3, "Title must be at least 3 characters"),
});

export const createExpenseSchema = expenseSchema.omit({ id: true });
