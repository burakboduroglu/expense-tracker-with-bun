import { Outlet, createFileRoute } from "@tanstack/react-router";
import { userQueryOptions } from "../lib/api"; // Ensure this import is correct and necessary

const Login = () => {
  return (
    <div>
      <p>You have to login</p>
      <a href="/api/login">Login</a>
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
