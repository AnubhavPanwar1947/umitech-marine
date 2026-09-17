const STORAGE_KEY = "umitech-marine-search-recent";
const MAX_RECENT = 8;

function isBrowser() {
  return typeof window !== "undefined" && typeof sessionStorage !== "undefined";
}

export function readRecentSearches() {
  if (!isBrowser()) {
    return [];
  }

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((entry) => typeof entry === "string" && entry.trim());
  } catch {
    return [];
  }
}

export function addRecentSearch(query) {
  const trimmed = String(query ?? "").trim();
  if (!trimmed || trimmed.length < 2 || !isBrowser()) {
    return;
  }

  const existing = readRecentSearches().filter(
    (entry) => entry.toLowerCase() !== trimmed.toLowerCase(),
  );
  const next = [trimmed, ...existing].slice(0, MAX_RECENT);

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore quota / privacy errors.
  }
}

export function clearRecentSearches() {
  if (!isBrowser()) {
    return;
  }
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore.
  }
}
