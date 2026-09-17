import { getSearchTokensForQuery } from "@/lib/site-search";

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function splitTextByHighlights(text, query) {
  const source = String(text ?? "");
  const tokens = getSearchTokensForQuery(query);
  if (!source || !tokens.length) {
    return [{ text: source, highlight: false }];
  }

  const pattern = tokens
    .map((token) => escapeRegExp(token))
    .sort((a, b) => b.length - a.length)
    .join("|");
  const regex = new RegExp(`(${pattern})`, "gi");
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(source)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: source.slice(lastIndex, match.index), highlight: false });
    }
    parts.push({ text: match[0], highlight: true });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < source.length) {
    parts.push({ text: source.slice(lastIndex), highlight: false });
  }

  return parts.length ? parts : [{ text: source, highlight: false }];
}
