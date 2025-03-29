import { test, expect } from "@playwright/test";

test.describe("Pulpit tests", () => {
  //Arrange
  const url = "https://demo-bank.vercel.app/";
  const userId = "testermo";
  const userPassword = "testtest";
  const receiverId = "2";
  const transferAmount = "200";
  const transferTitle = "pizza";
  const receiverPhoneNo = "502 xxx xxx";
  const topUpAmount = "50";

  test("successful transfer money", async ({ page }) => {
    //Act
    await page.goto(url);
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

    await page.waitForLoadState("domcontentloaded");

    await page.locator("#widget_1_transfer_receiver").selectOption(receiverId);
    await page.locator("#widget_1_transfer_amount").fill(transferAmount);
    await page.locator("#widget_1_transfer_title").fill(transferTitle);

    await page.locator("#execute_btn").click();
    await page.getByTestId("close-button").click();

    //Assert
    await expect(page.locator("#show_messages")).toHaveText(
      "Przelew wykonany! Chuck Demobankowy - 200,00PLN - pizza",
    );
  });

  test("successful phone top-up", async ({ page }) => {
    await page.goto(url);
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

    await page.waitForLoadState("domcontentloaded");

    await page
      .locator("#widget_1_topup_receiver")
      .selectOption(receiverPhoneNo);
    await page.locator("#widget_1_topup_amount").fill(topUpAmount);
    await page.locator("#uniform-widget_1_topup_agreement span").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await page.getByTestId("close-button").click();

    await expect(page.getByTestId("message-text")).toHaveText(
      "Doładowanie wykonane! 50,00PLN na numer 502 xxx xxx",
    );
  });
});
