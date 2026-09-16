const fs = require("fs");
const path = require("path");
const mammoth = require("mammoth");

const root = path.join(__dirname, "..");
const docxPath =
  process.env.CFD_DOCX_PATH ||
  "C:\\Users\\Admin\\Downloads\\Computational Fluid Dynamics- blog-v2.docx";
const mediaDir = path.join(
  root,
  "public/blog/computational-fluid-dynamics",
);
const htmlPath = path.join(
  root,
  "src/content/computational-fluid-dynamics.docx.html",
);
const hullImageSrc =
  process.env.CFD_HULL_IMAGE_SRC ||
  path.join(
    root,
    "assets/c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_2f43eee9c27e00d2d2ec152e65cedc30_images_image-05ce8b21-9528-4cf7-bbdc-17f1b06bf992.png",
  );
const hullImagePublicPath =
  "/blog/computational-fluid-dynamics/cfd-hull-model-views.png";
const hullImageDest = path.join(mediaDir, "cfd-hull-model-views.png");
const ANCHOR_SENTENCE =
  "Digital simulation must translate into operational outcome.";
const CFD_DOCX_TITLE = "3% Resistance Reduction = 6-Figure Annual Savings";

function stripHtmlToText(fragment) {
  return fragment.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function addCfdSectionAnchors(html) {
  let sectionIndex = 0;

  const registerSection = (plainText) => {
    if (plainText === CFD_DOCX_TITLE) {
      return null;
    }
    sectionIndex += 1;
    return `cfd-section-${sectionIndex}`;
  };

  let output = html.replace(
    /<p><strong>([\s\S]*?)<\/strong><\/p>/g,
    (match, inner) => {
      const plain = stripHtmlToText(inner);
      if (plain === CFD_DOCX_TITLE) {
        return `<p class="cfd-docx-title"><strong>${inner}</strong></p>`;
      }
      const id = registerSection(plain);
      if (!id) {
        return match;
      }
      return `<p id="${id}" class="cfd-docx-section"><strong>${inner}</strong></p>`;
    },
  );

  output = output.replace(
    /<ol><li><strong>([\s\S]*?)<\/strong>/g,
    (match, inner) => {
      const plain = stripHtmlToText(inner);
      const id = registerSection(plain);
      if (!id) {
        return match;
      }
      return `<ol><li id="${id}" class="cfd-docx-section"><strong>${inner}</strong>`;
    },
  );

  return output;
}

function injectSupplementalHullImage(html) {
  const escaped = ANCHOR_SENTENCE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matches = html.match(new RegExp(escaped, "g"));
  const count = matches ? matches.length : 0;
  if (count !== 1) {
    throw new Error(
      `CFD blog anchor must appear exactly once; found ${count}: "${ANCHOR_SENTENCE}"`,
    );
  }
  const anchorIndex = html.indexOf(ANCHOR_SENTENCE);
  const paragraphClose = html.indexOf("</p>", anchorIndex);
  if (paragraphClose === -1) {
    throw new Error("CFD blog anchor paragraph closing </p> not found.");
  }
  const insertAt = paragraphClose + "</p>".length;
  const hullMarkup = `<p><img src="${hullImagePublicPath}" alt="Four-view CATIA V5 ship hull model." /></p>`;
  return html.slice(0, insertAt) + hullMarkup + html.slice(insertAt);
}

fs.mkdirSync(mediaDir, { recursive: true });
fs.mkdirSync(path.dirname(htmlPath), { recursive: true });

if (fs.existsSync(hullImageSrc)) {
  fs.copyFileSync(hullImageSrc, hullImageDest);
} else if (!fs.existsSync(hullImageDest)) {
  console.error(
    `Hull image source not found: ${hullImageSrc} (and no existing ${hullImageDest})`,
  );
  process.exit(1);
}

let imageIndex = 0;

mammoth
  .convertToHtml(
    { path: docxPath },
    {
      convertImage: mammoth.images.imgElement((image) =>
        image.read("base64").then((imageBuffer) => {
          const buffer = Buffer.from(imageBuffer, "base64");
          imageIndex += 1;
          const ext =
            image.contentType === "image/png"
              ? "png"
              : image.contentType === "image/jpeg"
                ? "jpg"
                : image.contentType === "image/x-emf"
                  ? "emf"
                  : "bin";
          const filename = `docx-image-${imageIndex}.${ext}`;
          fs.writeFileSync(path.join(mediaDir, filename), buffer);
          if (ext === "emf") {
            return {
              src: `/blog/computational-fluid-dynamics/${filename}`,
            };
          }
          return {
            src: `/blog/computational-fluid-dynamics/${filename}`,
          };
        }),
      ),
    },
  )
  .then((result) => {
    const htmlWithHull = injectSupplementalHullImage(result.value);
    const htmlWithAnchors = addCfdSectionAnchors(htmlWithHull);
    fs.writeFileSync(htmlPath, htmlWithAnchors, "utf8");
    const plainText = stripHtmlToText(htmlWithAnchors);
    fs.writeFileSync(
      path.join(root, "src/lib/cfd-docx-plaintext.js"),
      `export const cfdDocxPlainText = ${JSON.stringify(plainText)};\n`,
      "utf8",
    );
    console.log(
      JSON.stringify(
        {
          htmlPath,
          mediaDir,
          imageCount: imageIndex,
          hullImage: hullImagePublicPath,
          messages: result.messages.map((m) => m.message),
          htmlLength: htmlWithAnchors.length,
        },
        null,
        2,
      ),
    );
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
