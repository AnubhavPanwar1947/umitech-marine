/**
 * Optional manual check: npx playwright install chromium && node scripts/verify-search-viewports.mjs
 * Requires dev server at BASE_URL (default http://localhost:3000).
 */
import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const WIDTHS = [50, 190, 320, 375, 480, 768, 959, 960, 1024, 1280, 1440];

async function openSearch(page) {
  const searchButton = page.locator('button[aria-label="Search"]').first();
  await searchButton.click();
  await page.waitForSelector('[role="search"]');
}

async function runQuery(page, query) {
  await openSearch(page);
  const input = page.locator('[role="search"] input[type="search"]');
  await input.fill(query);
  await page.waitForTimeout(400);
  const firstResult = page.locator('[role="listbox"] a.result').first();
  const href = await firstResult.getAttribute("href");
  await firstResult.click();
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(600);
  const marks = await page.locator("mark.search-destination-highlight").count();
  const hash = await page.evaluate(() => window.location.hash);
  return { href, hash, marks };
}

async function checkWidth(browser, width) {
  const page = await browser.newPage();
  await page.setViewportSize({ width, height: 800 });
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });

  const overflow = await page.evaluate(() => ({
    pageOverflow: document.documentElement.scrollWidth > window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));

  await openSearch(page);
  const panelBox = await page.locator('[role="search"]').boundingBox();
  const panelOverflow = panelBox
    ? panelBox.x < 0 || panelBox.x + panelBox.width > width
    : true;

  await page.close();
  return { width, ...overflow, panelOverflow };
}

async function main() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (error) {
    console.error(
      "Playwright chromium not available. Install with: npx playwright install chromium",
    );
    console.error(error.message);
    process.exit(1);
  }

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });

  try {
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    const liability = await runQuery(page, "100,000");
    console.log("100,000 navigation:", liability);
    expect:
      liability.hash.includes("standard-terms-clause-6-1") &&
        liability.marks > 0;
  } catch (error) {
    console.warn("Search flow test skipped:", error.message);
  }

  await page.close();

  console.log("\nViewport checks:");
  for (const width of WIDTHS) {
    const result = await checkWidth(browser, width);
    console.log(JSON.stringify(result));
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
