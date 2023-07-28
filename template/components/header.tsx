export function Header({ title }: { title: string }) {
  return (
    <h2 class="uppercase font-medium text-xs text-stone-400 pb-1">{title}</h2>
  );
}
