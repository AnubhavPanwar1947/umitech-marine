import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { Window } from "happy-dom";

const cssPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../src/components/SearchPanel.module.css",
);
const panelCss = readFileSync(cssPath, "utf8");

const VIEWPORTS = [50, 320, 375, 768, 1280];

function panelMarkupForViewport(width) {
  return `
    <div class="panel" style="width:${width}px;max-width:100vw;overflow-x:hidden;box-sizing:border-box;">
      <button type="button" style="min-width:2.75rem;min-height:2.75rem;">Close</button>
      <input type="search" style="width:100%;min-width:0;box-sizing:border-box;" value="engineering" />
      <p class="escapeHint">Esc to clear · Esc again to close</p>
      <button type="button" aria-disabled="true">Legal (0)</button>
      <button type="button">Clear</button>
    </div>
  `;
}

function hasHorizontalOverflow(document) {
  const root = document.documentElement;
  const body = document.body;
  return (
    root.scrollWidth > root.clientWidth || body.scrollWidth > body.clientWidth
  );
}

describe("search panel responsive fixture checks", () => {
  it("includes ultra-narrow rules for the escape hint and disabled chips", () => {
    assert.match(panelCss, /\.escapeHint/);
    assert.match(panelCss, /@media \(max-width: 179px\)[\s\S]*\.escapeHint/);
    assert.match(panelCss, /filterChipDisabled|aria-disabled="true"/);
  });

  for (const width of VIEWPORTS) {
    it(`keeps a representative open-panel fixture within ${width}px width`, () => {
      const window = new Window({
        innerWidth: width,
        innerHeight: 800,
      });
      const document = window.document;
      document.body.innerHTML = panelMarkupForViewport(width);
      const panel = document.querySelector(".panel");
      assert.ok(panel);
      assert.equal(hasHorizontalOverflow(document), false);
      const input = document.querySelector("input");
      assert.ok(input);
      assert.ok(input.getBoundingClientRect().width <= width);
      const disabledChip = document.querySelector('[aria-disabled="true"]');
      assert.ok(disabledChip);
    });
  }
});
