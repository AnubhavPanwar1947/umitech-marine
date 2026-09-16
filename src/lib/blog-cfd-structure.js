const CFD_DOCX_TITLE = "3% Resistance Reduction = 6-Figure Annual Savings";

export function stripHtmlToText(fragment) {
  return fragment.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

/** Headings and section ids are produced by scripts/convert-cfd-docx.cjs */
export function parseCfdDocxHeadings(html) {
  const headings = [];
  const pattern =
    /<(?:p|li)\s+id="(cfd-section-\d+)"\s+class="cfd-docx-section"[^>]*>\s*<strong>([\s\S]*?)<\/strong>/gi;

  let match = pattern.exec(html);
  while (match) {
    headings.push({
      id: match[1],
      label: stripHtmlToText(match[2]),
    });
    match = pattern.exec(html);
  }

  return headings;
}

export function getCfdDocxDisplayTitle(articleTitle) {
  return articleTitle || CFD_DOCX_TITLE;
}

export { CFD_DOCX_TITLE };
