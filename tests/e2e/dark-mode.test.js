import { test, expect } from "@playwright/test";

// Preline v2.4.1 delays its initialization by 2000ms, so tests must wait
// longer than that before expecting dark mode buttons to be functional.
const PRELINE_READY_TIMEOUT = 3000;

test.describe("Dark Mode Toggle", () => {
  test.beforeEach(async ({ page }) => {
    // Clear any stored theme preference so we start from a known state
    await page.goto("/");
    await page.evaluate(() => localStorage.removeItem("hs_theme"));
    await page.goto("/");
    // Wait for Preline to initialize (it has a hardcoded 2000ms delay)
    await page.waitForTimeout(PRELINE_READY_TIMEOUT);
  });

  test("dark mode button toggles dark class on html element", async ({ page }) => {
    // Find the visible dark mode toggle button (moon icon = switch to dark)
    // There are two buttons (mobile/desktop) - target the visible one
    const darkBtn = page.locator("button[data-hs-theme-click-value='dark']").filter({ visible: true });
    await expect(darkBtn).toBeVisible();

    // Click to enable dark mode
    await darkBtn.click();

    // html element should now have the "dark" class
    const htmlClass = await page.evaluate(() => document.documentElement.classList.contains("dark"));
    expect(htmlClass).toBe(true);

    // localStorage should be updated
    const storedTheme = await page.evaluate(() => localStorage.getItem("hs_theme"));
    expect(storedTheme).toBe("dark");
  });

  test("light mode button toggles off dark class", async ({ page }) => {
    // Start in dark mode
    await page.evaluate(() => localStorage.setItem("hs_theme", "dark"));
    await page.goto("/");
    await page.waitForTimeout(PRELINE_READY_TIMEOUT);

    // Verify we're in dark mode
    const isDark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
    expect(isDark).toBe(true);

    // Find the visible light mode toggle button (sun icon = switch to light)
    const lightBtn = page.locator("button[data-hs-theme-click-value='light']").filter({ visible: true });
    await expect(lightBtn).toBeVisible();

    // Click to disable dark mode
    await lightBtn.click();

    // html element should no longer have the "dark" class
    const htmlClass = await page.evaluate(() => document.documentElement.classList.contains("dark"));
    expect(htmlClass).toBe(false);

    const storedTheme = await page.evaluate(() => localStorage.getItem("hs_theme"));
    expect(storedTheme).toBe("light");
  });

  test("dark mode persists after client-side navigation", async ({ page }) => {
    // Enable dark mode
    const darkBtn = page.locator("button[data-hs-theme-click-value='dark']").filter({ visible: true });
    await darkBtn.click();

    // Navigate to another page
    await page.goto("/login");

    // Dark mode preference persists via localStorage - html should have dark class
    // (set by app.html script on load, not needing Preline to re-init)
    const htmlClass = await page.evaluate(() => document.documentElement.classList.contains("dark"));
    expect(htmlClass).toBe(true);
  });
});
