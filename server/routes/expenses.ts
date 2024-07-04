import {zValidator} from "@hono/zod-validator";
import {Hono} from "hono";
import {z} from "zod";

const expenseSchema = z.object({
    id: z.number().int().positive().min(1),
    amount: z.number().positive(),
    title: z.string().min(3).max(100),
});

type Expense = z.infer<typeof expenseSchema>;
const createPostSchema = expenseSchema.omit({id: true});

const fakeExpenses: Expense[] = [
    {
        id: 1,
        amount: 100,
        title: "Coffee",
    },
    {
        id: 2,
        amount: 200,
        title: "Lunch",
    },
];

export const expensesRoute = new Hono()
    .get("/", async (c) => {
        return c.json({expenses: fakeExpenses});
    })
    .post("/", zValidator("json", createPostSchema), async (c) => {
        const expense = c.req.valid("json");
        fakeExpenses.push({...expense, id: fakeExpenses.length + 1});
        return c.json(expense);
    })
    .get("/total-spent", (c) => {
        const total = fakeExpenses.reduce((acc, expense) => acc + expense.amount, 0)
        return c.json({total})
    })
    .get("/:id{[0-9]+}", async (c) => {
        const id = c.req.param("id");
        const expense = fakeExpenses.find((e) => e.id === Number(id));
        if (!expense) {
            return c.status(404);
        }
        return c.json(expense);
    })
    .delete("/:id{[0-9]+}", async (c) => {
        const id = c.req.param("id");
        const index = fakeExpenses.findIndex((e) => e.id === Number(id));
        if (index === -1) {
            return c.status(404);
        }
        const deletedExpense = fakeExpenses.splice(index, 1)[0];
        return c.json(deletedExpense);
    });
//.put
