import { test, expect } from "@playwright/test";

test("헤더가 보인다", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("banner")).toBeVisible();
});
