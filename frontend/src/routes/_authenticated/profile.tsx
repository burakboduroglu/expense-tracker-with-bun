import { createFileRoute } from "@tanstack/react-router";
import { userQueryOptions } from "../../lib/api.ts";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarImage } from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { AvatarFallback } from "@/components/ui/avatar.tsx";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions);

  if (error) return "Not logged in " + error.message;
  if (isPending) return "loading...";

  return (
    <div className="my-1 flex flex-col items-center">
      <div className="flex flex-col items-center gap-y-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="avatar-img" />
          <AvatarFallback style={{ backgroundColor: "blue" }}>
            {data.user.family_name[0] + data.user.family_name[0]}
          </AvatarFallback>
        </Avatar>
        <p>Hello {data.user.family_name}</p>
      </div>
      <Button asChild className="my-5">
        <a href="/api/logout">Logout</a>
      </Button>
    </div>
  );
}
