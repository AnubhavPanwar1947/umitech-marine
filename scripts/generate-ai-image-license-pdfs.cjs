/**
 * One-off: build PDF license records from public/images/*.LICENSE.txt
 * Output: licenses/ai-images/
 */
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "licenses", "ai-images");

const RECORDS = [
  {
    licenseTxt: "public/images/About.LICENSE.txt",
    pdfName: "LicenseRecord_UMITECH_Marine_About_AI_2026_09_21.pdf",
  },
  {
    licenseTxt: "public/images/Naval.LICENSE.txt",
    pdfName: "LicenseRecord_UMITECH_Marine_Naval_AI_2026_09_21.pdf",
  },
  {
    licenseTxt: "public/images/ENGINEERING.LICENSE.txt",
    pdfName: "LicenseRecord_UMITECH_Marine_Engineering_AI_2026_09_21.pdf",
  },
  {
    licenseTxt: "public/images/services-overview.LICENSE.txt",
    pdfName: "LicenseRecord_UMITECH_Marine_Services_Overview_AI_2026_09_21.pdf",
  },
];

function writePdfFromText(outPath, body) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 54, bottom: 54, left: 54, right: 54 },
    });
    const stream = fs.createWriteStream(outPath);
    doc.pipe(stream);
    doc.font("Helvetica").fontSize(10).text(body, {
      align: "left",
      lineGap: 2,
    });
    doc.end();
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const record of RECORDS) {
    const srcPath = path.join(ROOT, record.licenseTxt);
    const body = fs.readFileSync(srcPath, "utf8");
    const outPath = path.join(OUT_DIR, record.pdfName);
    await writePdfFromText(outPath, body);
    console.log("Wrote", path.relative(ROOT, outPath));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
