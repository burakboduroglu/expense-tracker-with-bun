import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "../../lib/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/_authenticated/expenses")({
  component: Expenses,
});

async function getAllExpenses() {
  const res = await api.expenses.$get();
  if (!res.ok) throw new Error("server error");
  const data = await res.json();
  return data;
}

function Expenses() {
  const { isPending, data, error } = useQuery({
    queryKey: ["get-all-expenses"],
    queryFn: getAllExpenses,
  });

  if (error) return "An error has occurred:" + error;

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <Table>
        <TableCaption>A list of your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <ExpenseSkeleton/>
          ) : (
            data?.expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.title}</TableCell>
                <TableCell className="font-xl">{expense.amount}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export function ExpenseSkeleton() {
  return Array(3)
    .fill(0)
    .map((_, i) => {
     return <TableRow key={i}>
        <TableCell className="font-medium">
          <Skeleton className="h-4 w-[250px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[200px]" />
        </TableCell>
      </TableRow>;
    });
}
