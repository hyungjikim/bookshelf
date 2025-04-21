import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("app/components/bookshelf/Cell.tsx", () => {
  test("초기 책 목록 5개에 제목, 저자명, 출판사명이 모두 표시된다", async ({
    page,
  }) => {
    await page.goto("/");

    const cells = page.getByTestId("cell-container");
    await expect(cells).toHaveCount(5);

    for (let i = 0; i < 5; i++) {
      const cell = cells.nth(i);
      await expect(cell.getByTestId("cell-title")).toBeVisible();
      await expect(cell.getByTestId("cell-author")).toBeVisible();
      await expect(cell.getByTestId("cell-publisher")).toBeVisible();
    }
  });

  test("스크롤을 내리면 새로운 리스트를 불러온다", async ({ page }) => {
    const title = faker.book.title();
    const author = faker.book.author();
    const publisher = faker.book.publisher();

    await page.route(
      /https:\/\/.*\.supabase\.co\/rest\/v1\/books/,
      async (route) => {
        await route.fulfill({
          status: 200,
          body: JSON.stringify([
            {
              id: faker.number.int(),
              title,
              author,
              publisher,
            },
          ]),
        });
      }
    );

    await page.goto("/");

    const cells = page.getByTestId("cell-container");
    await expect(cells).toHaveCount(5);

    await page.mouse.wheel(0, 10000);

    await expect(page.getByText("...loading more")).toBeVisible();

    await page.getByText("...loading more").scrollIntoViewIfNeeded();

    await expect(page.getByTestId("cell-title").last()).toHaveText(title);
    await expect(page.getByTestId("cell-author").last()).toHaveText(author);
    await expect(page.getByTestId("cell-publisher").last()).toHaveText(
      publisher
    );
  });
});
