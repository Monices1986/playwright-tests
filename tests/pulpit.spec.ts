import { test, expect } from "@playwright/test";

test.describe("Pulpit tests", () => {
  test.describe.configure({ retries: 3 });
  test("successful transfer money", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("testermo");
    await page.getByTestId("password-input").fill("testtest");
    await page.getByTestId("login-button").click();

    await page.waitForLoadState("domcontentloaded");

    await page.locator("#widget_1_transfer_receiver").selectOption("2");
    await page.locator("#widget_1_transfer_amount").fill("200");
    await page.locator("#widget_1_transfer_title").fill("pizza");

    await page.locator("#execute_btn").click();
    await page.getByTestId("close-button").click();

    await expect(page.locator("#show_messages")).toHaveText(
      "Przelew wykonany! Chuck Demobankowy - 200,00PLN - pizza"
    );
  });

  test("successful phone top-up", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("testermo");
    await page.getByTestId("password-input").fill("testtest");
    await page.getByTestId("login-button").click();

    await page.waitForLoadState("domcontentloaded");

    await page.locator("#widget_1_topup_receiver").selectOption("502 xxx xxx");
    await page.locator("#widget_1_topup_amount").fill("50");
    await page.locator("#uniform-widget_1_topup_agreement span").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await page.getByTestId("close-button").click();

    await expect(page.getByTestId("message-text")).toHaveText(
      "Doładowanie wykonane! 50,00PLN na numer 502 xxx xxx"
    );
  });
});
