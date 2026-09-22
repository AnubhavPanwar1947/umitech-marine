import {
  buildWordAwareHighlightRegExp,
  normalizeSearchTextForMatching,
} from "@/lib/search-matching";

export function buildHighlightRegExp(query, sourceText) {
  const source = String(sourceText ?? "");
  const normalizedHaystack = source
    ? normalizeSearchTextForMatching(source)
    : undefined;
  return buildWordAwareHighlightRegExp(query, normalizedHaystack, source);
}

export function splitTextByHighlights(text, query) {
  const source = String(text ?? "");
  const regex = buildHighlightRegExp(query, source);
  if (!source || !regex) {
    return [{ text: source, highlight: false }];
  }
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
