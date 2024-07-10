import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="mt-5 flex flex-col items-center">
      <h1 className="text-xl font-bold">Hello from About! 👋</h1>
    </div>
  );
}
