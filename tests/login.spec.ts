import { test, expect } from "@playwright/test";

test.describe("Login to Demobank", () => {
  test("login with correct credentials", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("testermo");
    await page.getByTestId("password-input").fill("testtest");
    await page.getByTestId("login-button").click();

    await expect(page.getByTestId("user-name")).toHaveText("Jan Demobankowy");
  });

  test("login with incorrect username", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("tester");
    await page.getByTestId("password-input").fill("testtest");

    await expect(page.getByTestId("error-login-id")).toHaveText(
      "identyfikator ma min. 8 znaków"
    );
  });

  test("login with incorrect password", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("testermo");
    await page.getByTestId("password-input").fill("test");
    await page.getByTestId("password-input").blur()

    await expect(page.getByTestId("error-login-password")).toHaveText(
      "hasło ma min. 8 znaków"
    );
  });
});
