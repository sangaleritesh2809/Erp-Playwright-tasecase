import { expect } from '@playwright/test';

export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators using data-testid attributes
    this.signInContainer = page.getByTestId('SI-signin-container');
    this.usernameInput = page.getByTestId('SI-username-input-password');
    this.passwordInput = page.getByTestId('SI-password-input-password');
    this.signInButton = page.getByTestId('SI-submit-button-show');
    this.forgotPasswordLink = page.getByTestId('SI-forgot-password-link-click');
  }

  /**
   * Navigate to the login page
   * @param {string} [url] - Optional target URL, defaults to baseURL
   */
  async goto(url = '/') {
    await this.page.goto(url);
    await expect(this.signInContainer).toBeVisible({ timeout: 15000 });
  }

  /**
   * Verify all initial login page elements are visible
   */
  async verifyLoginPageLoaded() {
    await expect(this.signInContainer).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.forgotPasswordLink).toBeVisible();
  }

  /**
   * Verify Sign In button is visible (displayed after filling credentials)
   */
  async verifySignInButtonVisible() {
    await expect(this.signInButton).toBeVisible();
  }

  /**
   * Fill the username / email input field
   * @param {string} username
   */
  async fillUsername(username) {
    await this.usernameInput.fill(username);
  }

  /**
   * Fill the password input field
   * @param {string} password
   */
  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  /**
   * Click the Sign In button
   */
  async clickSignIn() {
    await this.signInButton.click();
  }

  /**
   * Click the Forgot Password link
   */
  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  /**
   * Perform end-to-end login action
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickSignIn();
    // Wait for login to complete and redirect away from login container
    await this.signInContainer.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
  }
}
