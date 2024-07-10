import { type apiRoutes } from "@server/app.ts";
import { queryOptions } from "@tanstack/react-query";
import { hc } from "hono/client";

const client = hc<apiRoutes>("/");

export const api = client.api;

async function getCurrentUser() {
  const res = await api.me.$get();
  if (!res.ok) throw new Error("server error");
  const data = await res.json();
  return data;
}
export const userQueryOptions = queryOptions({
  queryKey: ["get-current-spent"],
  queryFn: getCurrentUser,
});
