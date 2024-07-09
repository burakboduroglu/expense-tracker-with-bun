import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="mt-5 flex flex-col items-center">
      <h1 className="text-xl font-bold">Hello from About! 👋</h1>
      <p className="mt-5 text-lg">You have to login or register</p>
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
}
