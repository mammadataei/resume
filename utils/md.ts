export const md = (text: string) => {
  return text.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="font-bold text-slate-900">$1</strong>'
  );
};
