import { Header } from "./header.tsx";

export function Summary({ summary }: { summary: string }) {
  return (
    <div>
      <Header title="Summary" />
      <p>{summary}</p>
    </div>
  );
}
