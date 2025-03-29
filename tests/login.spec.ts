import { test, expect } from "@playwright/test";

test.describe("Login to Demobank", () => {
  //Arrange
  const url = "https://demo-bank.vercel.app/";
  const userId = "testermo";
  const incorrectUserId = "test";
  const userPassword = "password";
  const incorrectUserPassword = "pass";
  const expectedUserName = "Jan Demobankowy";
  test("login with correct credentials", async ({ page }) => {
    //Act
    await page.goto(url);
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();
    //Assert
    await expect(page.getByTestId("user-name")).toHaveText(expectedUserName);
  });

  test("login with incorrect username", async ({ page }) => {
    await page.goto(url);
    await page.getByTestId("login-input").fill(incorrectUserId);
    await page.getByTestId("password-input").fill(userPassword);

    await expect(page.getByTestId("error-login-id")).toHaveText(
      "identyfikator ma min. 8 znaków"
    );
  });

  test("login with incorrect password", async ({ page }) => {
    await page.goto(url);
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(incorrectUserPassword);
    await page.getByTestId("password-input").blur();

    await expect(page.getByTestId("error-login-password")).toHaveText(
      "hasło ma min. 8 znaków"
    );
  });
});
