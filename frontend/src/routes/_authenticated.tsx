import { Outlet, createFileRoute } from "@tanstack/react-router";
import { userQueryOptions } from "../lib/api";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <div className="mt-5 flex flex-col items-center gap-2 text-xl font-bold">
      <p>You have to login or register</p>
      <div className="mt-3 flex gap-2">
        <Button asChild>
          <a href="/api/login">Login</a>
        </Button>
        <Button asChild>
          <a href="/api/register">Register</a>
        </Button>
      </div>
    </div>
  );
};

const Component = () => {
  const { user } = Route.useRouteContext();
  if (!user) {
    return <Login />;
  }
  return <Outlet />;
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;
    try {
      const data = await queryClient.fetchQuery(userQueryOptions);
      return data;
    } catch (e) {
      return { user: null };
    }
  },
  component: Component,
});
