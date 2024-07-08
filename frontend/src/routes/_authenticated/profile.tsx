import { createFileRoute } from "@tanstack/react-router";
import { userQueryOptions } from "../../lib/api.ts";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions);

  if (error) return "Not logged in " + error.message;
  if (isPending) return "loading...";

  return (
    <div className="p-2">
      <p>Hello {data.user.family_name}</p>
      <a href="/api/logout">Logout</a>
    </div>
  );
}
