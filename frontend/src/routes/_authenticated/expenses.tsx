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
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

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
    <div className="m-auto max-w-3xl p-2">
      <Table>
        <TableCaption>A list of your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <ExpenseSkeleton />
          ) : (
            data?.expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-xl">{expense.id}</TableCell>
                <TableCell className="whitespace-nowrap font-medium">
                  {expense.title}
                </TableCell>
                <TableCell className="font-xl">{expense.amount}</TableCell>
                <TableCell className="font-xl">
                  {expense.date.split("T")[0]}
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="icon">
                    <Trash className="h-4 w-4" color="red" />
                  </Button>
                </TableCell>
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
      return (
        <TableRow key={i}>
          <TableCell className="font-medium">
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[200px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[200px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[200px]" />
          </TableCell>
        </TableRow>
      );
    });
}
