import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});

function Navbar() {
  return (
    <div className="m-auto flex max-w-4xl items-baseline justify-between gap-2 p-5 text-lg">
      <Link to="/" className="pr-20">
        <h1 className="text-2xl font-bold">Expense Tracker</h1>
      </Link>
      <div className="flex gap-10">
        <Link to="/" className="hover:text-gray-500 [&.active]:text-gray-400">
          Home
        </Link>{" "}
        <Link
          to="/about"
          className="hover:text-gray-500 [&.active]:text-gray-400"
        >
          About
        </Link>{" "}
        <Link
          to="/expenses"
          className="hover:text-gray-500 [&.active]:text-gray-400"
        >
          Expenses
        </Link>{" "}
        <Link
          to="/create-expense"
          className="hover:text-gray-500 [&.active]:text-gray-400"
        >
          Create Expense
        </Link>{" "}
        <Link
          to="/profile"
          className="hover:text-gray-500 [&.active]:text-gray-400"
        >
          Profile
        </Link>
      </div>
    </div>
  );
}
function Root() {
  return (
    <>
      <Navbar />
      <hr />
      <div className="mt-3">
        <Outlet />
      </div>
    </>
  );
}
