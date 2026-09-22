import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcRoot = path.join(projectRoot, "src");

function resolveAlias(specifier) {
  if (!specifier.startsWith("@/")) {
    return null;
  }

  const relativePath = specifier.slice(2).replace(/\\/g, "/");
  const candidates = [
    path.join(srcRoot, relativePath),
    path.join(srcRoot, `${relativePath}.js`),
    path.join(srcRoot, relativePath, "index.js"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return pathToFileURL(candidate).href;
    }
  }

  return pathToFileURL(path.join(srcRoot, `${relativePath}.js`)).href;
}

export async function resolve(specifier, context, nextResolve) {
  const aliased = resolveAlias(specifier);
  if (aliased) {
    return nextResolve(aliased, context);
  }
  return nextResolve(specifier, context);
}
