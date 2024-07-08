import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { getUser } from "../kinde";
import { db } from "../db";
import { expenses as expenseTable } from "../db/schema/expenses";
import { eq } from "drizzle-orm";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  amount: z.string(),
  title: z.string().min(3).max(100),
});

type Expense = z.infer<typeof expenseSchema>;
const createPostSchema = expenseSchema.omit({ id: true });

const fakeExpenses: Expense[] = [
  {
    id: 1,
    amount: "100",
    title: "Coffee",
  },
  {
    id: 2,
    amount: "200",
    title: "Lunch",
  },
];

export const expensesRoute = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.var.user;

    const expenses = await db
      .select()
      .from(expenseTable)
      .where(eq(expenseTable.userId, user.id));

    return c.json({ expenses });
  })
  .post("/", getUser, zValidator("json", createPostSchema), async (c) => {
    const expense = c.req.valid("json");
    const user = c.var.user

    const result = await db.insert(expenseTable).values({
      ...expense,
      userId: user.id
    }).returning()    

    c.status(201)
    return c.json(result);
  })
  .get("/total-spent", getUser, async (c) => {
    const total = fakeExpenses.reduce(
      (acc, expense) => acc + +expense.amount,
      0
    );
    return c.json({ total });
  })
  .get("/:id{[0-9]+}", getUser, async (c) => {
    const id = c.req.param("id");
    const expense = fakeExpenses.find((e) => e.id === Number(id));
    if (!expense) {
      return c.status(404);
    }
    return c.json(expense);
  })
  .delete("/:id{[0-9]+}", getUser, async (c) => {
    const id = c.req.param("id");
    const index = fakeExpenses.findIndex((e) => e.id === Number(id));
    if (index === -1) {
      return c.status(404);
    }
    const deletedExpense = fakeExpenses.splice(index, 1)[0];
    return c.json(deletedExpense);
  });
