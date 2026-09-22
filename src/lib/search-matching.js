const SEARCH_SYNONYM_RULES = [
  { pattern: /\bmarine survey(?:ing)?\b/gi, replacement: "surveying" },
  { pattern: /\bship design\b/gi, replacement: "naval architecture" },
  { pattern: /\bcfd\b/gi, replacement: "computational fluid dynamics" },
  { pattern: /\btechnical consulting\b/gi, replacement: "engineering" },
  { pattern: /\bconsult\b/gi, replacement: "engineering" },
];

/** Tokens that must match as whole words only (not as substrings inside other words). */
export const EXACT_SHORT_TOKENS = new Set(["ai", "cfd", "ci", "ii", "ghg", "pi"]);

const MIN_TYPO_TOKEN_LENGTH = 5;

/** Minimum shared length for prefix-style word-family matching (e.g. inspect → inspection). */
const MIN_PREFIX_MATCH_LENGTH = 4;

/**
 * Explicit word-family groups where a simple prefix rule is not enough
 * (e.g. certificate ↔ certification).
 */
const WORD_FAMILY_GROUPS = [
  ["certificate", "certification", "certificates"],
];

const WORD_FAMILY_LOOKUP = new Map();
for (const group of WORD_FAMILY_GROUPS) {
  for (const word of group) {
    WORD_FAMILY_LOOKUP.set(word, new Set(group));
  }
}

const HTML_ENTITY_MAP = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

export function expandQueryWithSynonyms(query) {
  let expanded = String(query ?? "");
  for (const rule of SEARCH_SYNONYM_RULES) {
    expanded = expanded.replace(rule.pattern, rule.replacement);
  }
  return expanded;
}

function preserveShortAmpersandAbbreviations(value) {
  return String(value ?? "").replace(
    /\b([a-zA-Z]{1,4})&([a-zA-Z]{1,4})\b/g,
    (_, left, right) => ` ${left.toLowerCase()}${right.toLowerCase()} `,
  );
}

export function normalizeSearchTextForMatching(value) {
  return preserveShortAmpersandAbbreviations(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u2010-\u2015\u2212]/g, "-")
    .replace(/-/g, " ")
    .replace(/&/g, " and ")
    .replace(/[/\\]/g, " ")
    .replace(/[^\p{L}\p{N}\s@.,%-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** @deprecated Use normalizeSearchTextForMatching for query/index matching. */
export function normalizeSearchText(value) {
  return normalizeSearchTextForMatching(value);
}

export function tokenizeSearchQuery(query) {
  const expanded = expandQueryWithSynonyms(query);
  const normalized = normalizeSearchTextForMatching(expanded);
  if (!normalized) {
    return [];
  }
  return normalized
    .split(" ")
    .map((token) => token.trim())
    .filter(
      (token) =>
        token.length >= 2 ||
        /^\d/.test(token) ||
        token.includes("@") ||
        token.includes("."),
    );
}

export function getSearchTokensForQuery(query) {
  return tokenizeSearchQuery(query);
}

export function decodeHtmlEntities(value) {
  return String(value ?? "").replace(
    /&(#x?[0-9a-f]+|[a-z]+);/gi,
    (match, entity) => {
      if (entity.startsWith("#x") || entity.startsWith("#X")) {
        const code = Number.parseInt(entity.slice(2), 16);
        return Number.isFinite(code) ? String.fromCodePoint(code) : match;
      }
      if (entity.startsWith("#")) {
        const code = Number.parseInt(entity.slice(1), 10);
        return Number.isFinite(code) ? String.fromCodePoint(code) : match;
      }
      const lower = entity.toLowerCase();
      if (HTML_ENTITY_MAP[lower] !== undefined) {
        return HTML_ENTITY_MAP[lower];
      }
      return match;
    },
  );
}

export function stripHtmlForSearch(value) {
  return String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/<[a-z][a-z0-9-]*/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function sanitizeVisibleSearchSource(value) {
  const decoded = decodeHtmlEntities(stripHtmlForSearch(value));
  return decoded.replace(/\s+/g, " ").trim();
}

function requiresExactTokenMatch(token) {
  if (!token) {
    return true;
  }
  if (EXACT_SHORT_TOKENS.has(token)) {
    return true;
  }
  return token.length <= 3;
}

function wordsShareExplicitFamily(a, b) {
  const familyA = WORD_FAMILY_LOOKUP.get(a);
  const familyB = WORD_FAMILY_LOOKUP.get(b);
  if (!familyA || !familyB) {
    return false;
  }
  for (const entry of familyA) {
    if (familyB.has(entry)) {
      return true;
    }
  }
  return false;
}

function wordsMatchByPrefix(normalizedWord, token) {
  if (requiresExactTokenMatch(token) || requiresExactTokenMatch(normalizedWord)) {
    return false;
  }

  const shorter = normalizedWord.length <= token.length ? normalizedWord : token;
  const longer = normalizedWord.length <= token.length ? token : normalizedWord;

  if (shorter.length < MIN_PREFIX_MATCH_LENGTH) {
    return false;
  }

  return longer.startsWith(shorter);
}

function levenshteinDistance(a, b) {
  const left = String(a ?? "");
  const right = String(b ?? "");
  if (left === right) {
    return 0;
  }
  if (!left.length) {
    return right.length;
  }
  if (!right.length) {
    return left.length;
  }

  const rows = left.length + 1;
  const cols = right.length + 1;
  const matrix = Array.from({ length: rows }, () => new Array(cols).fill(0));

  for (let i = 0; i < rows; i += 1) {
    matrix[i][0] = i;
  }
  for (let j = 0; j < cols; j += 1) {
    matrix[0][j] = j;
  }

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = left[i - 1] === right[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }

  return matrix[rows - 1][cols - 1];
}

function maxAllowedTypoEdits(token) {
  if (!token || token.length < MIN_TYPO_TOKEN_LENGTH) {
    return 0;
  }
  if (token.length <= 8) {
    return 1;
  }
  return 2;
}

function wordsMatchByTypo(normalizedWord, token) {
  if (requiresExactTokenMatch(token) || requiresExactTokenMatch(normalizedWord)) {
    return false;
  }

  const maxEdits = maxAllowedTypoEdits(token);
  if (maxEdits === 0) {
    return false;
  }

  const distance = levenshteinDistance(token, normalizedWord);
  if (distance > maxEdits) {
    return false;
  }

  if (maxEdits === 2 && token.length < 9 && normalizedWord.length < 9) {
    return distance <= 1;
  }

  return true;
}

export function getTokenInflectionVariants(token) {
  const variants = new Set([token]);
  if (!token || token.length < 3) {
    return [...variants];
  }

  if (token.endsWith("s") && !token.endsWith("ss") && token.length > 3) {
    variants.add(token.slice(0, -1));
  } else if (!token.endsWith("s")) {
    variants.add(`${token}s`);
  }

  if (token.endsWith("ies") && token.length > 4) {
    variants.add(`${token.slice(0, -3)}y`);
  } else if (token.endsWith("y") && token.length > 2) {
    variants.add(`${token.slice(0, -1)}ies`);
  }

  if (token.endsWith("ing") && token.length > 5) {
    variants.add(token.slice(0, -3));
    variants.add(`${token.slice(0, -3)}e`);
  }

  return [...variants];
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeWordToken(word) {
  return String(word ?? "")
    .replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "")
    .trim();
}

function splitNormalizedWords(normalizedText) {
  return String(normalizedText ?? "")
    .split(" ")
    .map((word) => normalizeWordToken(word))
    .filter(Boolean);
}

function getMergedAdjacentWords(words) {
  const merged = [];
  for (let i = 0; i < words.length; i += 1) {
    merged.push(words[i]);
    if (i < words.length - 1) {
      merged.push(`${words[i]}${words[i + 1]}`);
    }
  }
  return merged;
}

export function tokenMatchesWord(normalizedWord, token) {
  if (!normalizedWord || !token) {
    return false;
  }

  if (normalizedWord === token) {
    return true;
  }

  const variants = getTokenInflectionVariants(token);
  for (const variant of variants) {
    if (normalizedWord === variant) {
      return true;
    }
  }

  if (wordsShareExplicitFamily(normalizedWord, token)) {
    return true;
  }

  if (wordsMatchByPrefix(normalizedWord, token)) {
    return true;
  }

  if (wordsMatchByTypo(normalizedWord, token)) {
    return true;
  }

  return false;
}

export function findMatchingWordsForToken(normalizedText, token) {
  const words = getMergedAdjacentWords(splitNormalizedWords(normalizedText));
  return words.filter((word) => tokenMatchesWord(word, token));
}

export function tokenMatchesInNormalizedText(normalizedText, token) {
  if (!token) {
    return false;
  }

  const haystack = String(normalizedText ?? "");
  if (!haystack) {
    return false;
  }

  const words = splitNormalizedWords(haystack);
  const candidates = getMergedAdjacentWords(words);
  return candidates.some((word) => tokenMatchesWord(word, token));
}

export function compoundMatchesInText(normalizedText, compound) {
  if (!compound || compound.length < 4) {
    return false;
  }

  const words = splitNormalizedWords(normalizedText);
  if (words.some((word) => word === compound)) {
    return true;
  }

  for (let i = 0; i < words.length - 1; i += 1) {
    if (`${words[i]}${words[i + 1]}` === compound) {
      return true;
    }
  }

  return false;
}

export function queryTokensSatisfied(normalizedText, tokens) {
  if (!tokens?.length) {
    return false;
  }

  const satisfied = new Set();

  for (const token of tokens) {
    if (tokenMatchesInNormalizedText(normalizedText, token)) {
      satisfied.add(token);
    }
  }

  for (let i = 0; i < tokens.length - 1; i += 1) {
    const compound = `${tokens[i]}${tokens[i + 1]}`;
    if (compoundMatchesInText(normalizedText, compound)) {
      satisfied.add(tokens[i]);
      satisfied.add(tokens[i + 1]);
    }
  }

  return satisfied.size === tokens.length;
}

export function allTokensMatchInNormalizedText(normalizedText, tokens) {
  return queryTokensSatisfied(normalizedText, tokens);
}

export function getVisibleMatchText(record) {
  const title = normalizeSearchTextForMatching(record.title);
  const body = normalizeSearchTextForMatching(record.searchText);
  return `${title} ${body}`.trim();
}

export function recordMatchesQuery(record, query, { relaxed = false } = {}) {
  const tokens = getSearchTokensForQuery(query);
  if (!tokens.length) {
    return false;
  }

  const visible = getVisibleMatchText(record);

  if (queryTokensSatisfied(visible, tokens)) {
    return true;
  }

  if (!relaxed) {
    return false;
  }

  const matchedCount = tokens.filter((token) =>
    tokenMatchesInNormalizedText(visible, token),
  ).length;

  return matchedCount > 0;
}

function locateTermInOriginalSource(originalSource, normalizedTerm, token) {
  const source = String(originalSource ?? "");
  if (!source || !normalizedTerm) {
    return null;
  }

  const wordPattern = new RegExp(
    `\\b${normalizedTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
    "i",
  );
  const wordMatch = source.match(wordPattern);
  if (wordMatch?.[0]) {
    return wordMatch[0];
  }

  if (token === "pi") {
    const piMatch = source.match(/\bp\s*&\s*i\b/i);
    if (piMatch?.[0]) {
      return piMatch[0];
    }
  }

  const loose = source.toLowerCase().indexOf(normalizedTerm.toLowerCase());
  if (loose >= 0) {
    return source.slice(loose, loose + normalizedTerm.length);
  }

  return null;
}

function highlightPatternForToken(token, normalizedHaystack, originalHaystack) {
  const haystackMatches = normalizedHaystack
    ? findMatchingWordsForToken(normalizedHaystack, token)
    : [];

  const parts = new Set();
  for (const word of haystackMatches) {
    const located = locateTermInOriginalSource(originalHaystack, word, token);
    parts.add(escapeRegExp(located ?? word));
  }

  const variants = [...new Set(getTokenInflectionVariants(token))];
  const family = WORD_FAMILY_LOOKUP.get(token);
  if (family) {
    for (const related of family) {
      variants.push(related);
    }
  }

  for (const variant of variants) {
    parts.add(escapeRegExp(variant));
  }

  if (!requiresExactTokenMatch(token) && token.length >= MIN_PREFIX_MATCH_LENGTH) {
    parts.add(`${escapeRegExp(token)}\\w*`);
  }

  if (!parts.size) {
    return null;
  }

  return `\\b(?:${[...parts].join("|")})\\b`;
}

export function buildWordAwareHighlightRegExp(
  query,
  normalizedHaystack,
  originalHaystack,
) {
  const tokens = getSearchTokensForQuery(query);
  if (!tokens.length) {
    return null;
  }

  const patterns = [];
  const source = String(originalHaystack ?? "");

  if (normalizedHaystack && tokens.length >= 2) {
    for (let i = 0; i < tokens.length - 1; i += 1) {
      const compound = `${tokens[i]}${tokens[i + 1]}`;
      if (!compoundMatchesInText(normalizedHaystack, compound)) {
        continue;
      }
      const words = getMergedAdjacentWords(splitNormalizedWords(normalizedHaystack));
      const hit = words.find((word) => word === compound);
      if (!hit) {
        continue;
      }
      const located = locateTermInOriginalSource(source, hit, compound);
      patterns.push(`\\b${escapeRegExp(located ?? hit)}\\b`);
    }
  }

  for (const token of tokens) {
    const pattern = highlightPatternForToken(
      token,
      normalizedHaystack,
      originalHaystack,
    );
    if (pattern) {
      patterns.push(pattern);
    }
  }

  if (!patterns.length) {
    return null;
  }

  patterns.sort((a, b) => b.length - a.length);
  return new RegExp(`(${patterns.join("|")})`, "gi");
}

export function recordHasHighlightableVisibleMatch(sourceText, query) {
  const source = String(sourceText ?? "");
  if (!source) {
    return false;
  }

  const normalized = normalizeSearchTextForMatching(source);
  const tokens = getSearchTokensForQuery(query);
  if (!tokens.length || !queryTokensSatisfied(normalized, tokens)) {
    return false;
  }

  const regex = buildWordAwareHighlightRegExp(query, normalized, source);
  return Boolean(regex?.test(source));
}

export function findSnippetAnchorIndex(text, query) {
  const source = String(text ?? "");
  if (!source) {
    return -1;
  }

  const normalized = normalizeSearchTextForMatching(source);
  const tokens = getSearchTokensForQuery(query);

  if (tokens.length >= 2) {
    for (let i = 0; i < tokens.length - 1; i += 1) {
      const compound = `${tokens[i]}${tokens[i + 1]}`;
      if (!compoundMatchesInText(normalized, compound)) {
        continue;
      }
      const words = getMergedAdjacentWords(splitNormalizedWords(normalized));
      const hit = words.find((word) => word === compound);
      if (!hit) {
        continue;
      }
      const located = locateTermInOriginalSource(source, hit, compound);
      const needle = located ?? hit;
      const index = source.toLowerCase().indexOf(needle.toLowerCase());
      if (index >= 0) {
        return index;
      }
    }
  }

  const words = splitNormalizedWords(normalized);
  const candidates = getMergedAdjacentWords(words);

  for (const token of tokens) {
    const wordIndex = candidates.findIndex((word) => tokenMatchesWord(word, token));
    if (wordIndex >= 0) {
      const needle = candidates[wordIndex];
      const located = locateTermInOriginalSource(source, needle, token);
      const searchNeedle = located ?? needle;
      const index = source.toLowerCase().indexOf(searchNeedle.toLowerCase());
      if (index >= 0) {
        return index;
      }
    }
  }

  return -1;
}
