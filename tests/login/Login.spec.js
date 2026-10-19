import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login/LoginPage.js';

test.describe('Authentication - Login Suite', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  // फक्त लॉगिन ची मेन टेस्ट चालू ठेवली आहे (Slow & Step-by-Step)
  test('should open site and perform login step-by-step', async ({ page }) => {
    // 1. ओपन साईट
    await page.goto('https://platform.baap.company');
    await page.waitForTimeout(1000); // 1 सेकंद थांबा जेणेकरून साईट नीट दिसेल

    const username = process.env.USER_EMAIL || process.env.USERNAME;
    const password = process.env.PASSWORD;

    expect(username, 'USERNAME should be defined in .env').toBeTruthy();
    expect(password, 'PASSWORD should be defined in .env').toBeTruthy();

    // 2. युझरनेम टाका आणि थांबा
    await loginPage.fillUsername(username);
    await page.waitForTimeout(1000);

    // 3. पासवर्ड टाका आणि थांबा
    await loginPage.fillPassword(password);
    await page.waitForTimeout(1000);

    // 4. Sign In बटणावर क्लिक करा
    await loginPage.clickSignIn();

    // 5. लॉगिन झाल्यावर डॅशबोर्ड/पेज लोड होईपर्यंत थांबा
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // 6. लॉगिन सेशन (cookies/tokens) सेव्ह करा जेणेकरून Group टेस्ट मध्ये पुन्हा लॉगिन करावे लागणार नाही
    await page.context().storageState({ path: 'storageState.json' });
  });

  /*
  // बाकीच्या टेस्ट्स युझरच्या सांगण्यानुसार कमेंट केल्या आहेत:
  
  test('should verify all login page UI elements are visible', async () => {
    await loginPage.goto('/');
    await loginPage.verifyLoginPageLoaded();
    await loginPage.fillUsername('test@example.com');
    await loginPage.fillPassword('DummyPass123');
    await loginPage.verifySignInButtonVisible();
  });
 
  test('should display error or stay on page with invalid password', async () => {
    await loginPage.goto('/');
    const username = process.env.USER_EMAIL || process.env.USERNAME;
    await loginPage.login(username, 'WrongPassword@123');
    await expect(loginPage.signInContainer).toBeVisible();
  });
  */
});
