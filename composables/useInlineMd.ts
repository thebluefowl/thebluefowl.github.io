// Tiny inline-markdown renderer for short strings stored in YAML frontmatter
// (ledes, blurbs). Handles *em* and [text](url). Not a real parser.
export function useInlineMd(input: string | undefined | null): string {
  if (!input) return "";
  return input
    .replace(/\n/g, " ")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-black underline underline-offset-[3px] decoration-1 hover:text-slate-500 transition-colors">$1</a>'
    );
}
