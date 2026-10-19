import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login/LoginPage.js';
import { GroupPage } from '../../pages/group/GroupPage.js';
import { MenuPage } from '../../pages/menu/MenuPage.js';

test.describe('Sidebar Navigation Menu Suite', () => {
  let loginPage;
  let groupPage;
  let menuPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    groupPage = new GroupPage(page);
    menuPage = new MenuPage(page);

    await page.goto('/');

    // Check if login is needed
    const needsLogin = await loginPage.usernameInput.isVisible({ timeout: 2500 }).catch(() => false);

    if (needsLogin) {
      const username = process.env.USER_EMAIL || process.env.USERNAME;
      const password = process.env.PASSWORD;

      expect(username, 'USER_EMAIL/USERNAME should be defined in .env').toBeTruthy();
      expect(password, 'PASSWORD should be defined in .env').toBeTruthy();

      await loginPage.login(username, password);
      await page.waitForLoadState('networkidle');
      await page.context().storageState({ path: 'storageState.json' });
    }

    // If sidebar menu is already visible, we are already inside the application!
    const isMenuVisible = await menuPage.myHrmsButton.isVisible({ timeout: 3000 }).catch(() => false);
    if (!isMenuVisible) {
      // Check if Choose Organization page is shown
      const isOrgPage = await page.getByTestId('CG-container').isVisible({ timeout: 3000 }).catch(() => false);
      if (isOrgPage) {
        const firstCard = page.locator('[data-testid^="CG-org-card-"]').first();
        if (await firstCard.isVisible({ timeout: 5000 }).catch(() => false)) {
          await firstCard.click();
          await page.waitForLoadState('networkidle');
          await page.waitForTimeout(2000);
        }
      }
    }
  });

  test('should click My HRMS and then click HRMS Configuration using data-testid', async ({ page }) => {
    console.log('1. My HRMS वर क्लिक करत आहे...');
    await menuPage.clickMyHrms();
    await page.waitForTimeout(1500);

    console.log('2. HRMS Configuration (data-testid="submenu-item-hrms-configuration") वर क्लिक करत आहे...');
    await menuPage.clickHrmsConfiguration();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);

    await expect(page).toHaveURL(/.*configuration/);
    console.log('✅ HRMS Configuration पेज यशस्वीरीत्या उघडले आहे!');
  });

  test('should click Dashboard using data-testid', async ({ page }) => {
    await menuPage.clickDashboard();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('should expand My HRMS and click HRMS Configuration using data-testid', async ({ page }) => {
    // 1. Click My HRMS to expand submenu
    await menuPage.clickMyHrms();
    await page.waitForTimeout(1000);

    // 2. Click HRMS Configuration submenu item
    await menuPage.clickHrmsConfiguration();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/.*configuration/);
  });

  test('should navigate to Attendance under My HRMS', async ({ page }) => {
    await menuPage.clickAttendance();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/.*attendance/);
  });

  test('should click any menu and submenu dynamically by test-id', async ({ page }) => {
    // Dynamic click using data-testid
    await menuPage.clickByTestId('menu-item-my-hrms');
    await page.waitForTimeout(500);
    await menuPage.clickByTestId('submenu-item-leave-management');
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/.*leave-management/);
  });
});
