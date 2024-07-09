import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { api } from "../../lib/api";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { createExpenseSchema } from "../../../../server/sharedTypes";

export const Route = createFileRoute("/_authenticated/create-expense")({
  component: CreateExpenses,
});

function CreateExpenses() {
  const navigate = useNavigate();
  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      title: "",
      amount: "",
    },
    onSubmit: async ({ value }) => {
      const res = await api.expenses.$post({ json: value });
      if (!res.ok) {
        throw new Error("server error");
      }
      navigate({ to: "/expenses" });
    },
  });

  return (
    <div className="p-2">
      <h1 className="pb-5 text-center text-lg font-bold">Create Expense</h1>
      <form
        className="m-auto max-w-4xl"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="title"
          validators={{
            onChange: createExpenseSchema.shape.title,
          }}
          children={(field) => (
            <div className="pb-3">
              <Label htmlFor={field.name}>Title</Label>
              <Input
                type="text"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                placeholder="Title"
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <em>{field.state.meta.errors.join(", ")}</em>
              ) : null}
              {field.state.meta.isValidating ? "Validating..." : null}
            </div>
          )}
        />

        <form.Field
          name="amount"
          validators={{
            onChange: createExpenseSchema.shape.amount,
          }}
          children={(field) => (
            <div className="pb-4">
              <Label htmlFor={field.name}>Amount</Label>
              <Input
                type="number"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                placeholder="Title"
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <em>{field.state.meta.errors.join(", ")}</em>
              ) : null}
              {field.state.meta.isValidating ? "Validating..." : null}
            </div>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit} className="mt-4">
              {isSubmitting ? "..." : "Create Expense"}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
