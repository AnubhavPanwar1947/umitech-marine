import fs from "fs";
import path from "path";

export function getBlogDocxHtml(filename) {
  const filePath = path.join(process.cwd(), "src/content", filename);
  return fs.readFileSync(filePath, "utf8");
}
