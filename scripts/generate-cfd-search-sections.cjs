const fs = require("fs");
const path = require("path");

const htmlPath = path.join(
  __dirname,
  "../src/content/computational-fluid-dynamics.docx.html",
);
const outPath = path.join(__dirname, "../src/lib/cfd-docx-search-sections.js");

const html = fs.readFileSync(htmlPath, "utf8");

function stripHtml(fragment) {
  return fragment.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

const markerPattern = /id="(cfd-section-\d+)"/g;
const markers = [];
let markerMatch = markerPattern.exec(html);
while (markerMatch) {
  markers.push({
    id: markerMatch[1],
    index: markerMatch.index,
  });
  markerMatch = markerPattern.exec(html);
}

const headingPattern =
  /<(?:p|li|ol)[^>]*\s+id="(cfd-section-\d+)"[^>]*>[\s\S]*?<strong>([\s\S]*?)<\/strong>/gi;

const labelById = new Map();
let headingMatch = headingPattern.exec(html);
while (headingMatch) {
  labelById.set(headingMatch[1], stripHtml(headingMatch[2]));
  headingMatch = headingPattern.exec(html);
}

const sections = markers.map((marker, markerIndex) => {
  const tagClose = html.indexOf(">", marker.index);
  const start = tagClose >= 0 ? tagClose + 1 : marker.index;
  const end =
    markerIndex < markers.length - 1
      ? markers[markerIndex + 1].index
      : html.length;
  const chunk = html.slice(start, end);
  return {
    id: marker.id,
    label: labelById.get(marker.id) ?? "",
    searchText: stripHtml(chunk),
  };
});

fs.writeFileSync(
  outPath,
  `export const cfdDocxSearchSections = ${JSON.stringify(sections, null, 2)};\n`,
  "utf8",
);

console.log(`Wrote ${sections.length} CFD sections`);
