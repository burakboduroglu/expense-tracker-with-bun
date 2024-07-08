import {
  Outlet,
  createFileRoute,
} from "@tanstack/react-router";
import { userQueryOptions } from "../lib/api"; // Ensure this import is correct and necessary

const Login = () => {
  return <div>You have to login</div>;
};

const Component = () => {
  const { user } = Route.useRouteContext();
  if (!user) {
    return <Login />;
  }
  return <Outlet />;
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    userQueryOptions;
    return { user: null };
  },
  component: Component,
});
