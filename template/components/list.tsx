import { Header } from "./header.tsx";

export function List({
  title,
  items,
}: {
  title: string;
  items: Array<string>;
}) {
  return (
    <div>
      <Header title={title} />

      <ul class="list-disc pl-4">
        {items.map((item) => (
          <li class="">{item}</li>
        ))}
      </ul>
    </div>
  );
}
