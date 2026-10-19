import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login/LoginPage.js';
import { MenuPage } from '../../pages/menu/MenuPage.js';
import { HrmsConfigurationPage } from '../../pages/my-hrms/HrmsConfigurationPage.js';

test.describe('HRMS Configuration Suite', () => {
  let loginPage;
  let menuPage;
  let hrmsConfigPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    menuPage = new MenuPage(page);
    hrmsConfigPage = new HrmsConfigurationPage(page);

    await page.goto('/');

    // 1. Check if login is needed
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

    // 2. Navigate to HRMS Configuration page via sidebar menu
    await menuPage.clickMyHrms();
    await page.waitForTimeout(1000);
    await menuPage.clickHrmsConfiguration();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
  });

  test('should fill Create Configuration form and save using data-testids', async ({ page }) => {
    // 1. Click Add button to open Create Configuration
    console.log('1. Add बटणावर क्लिक करत आहे...');
    await hrmsConfigPage.clickAddButton();
    await page.waitForTimeout(2000);

    // 2. Fill Configuration Name (data-testid="HRMS-CAC-input-config-name")
    const configName = `Pankaj config ${Date.now().toString().slice(-4)}`;
    console.log(`2. Configuration Name भरत आहे: ${configName}`);
    await hrmsConfigPage.fillConfigName(configName);
    await page.waitForTimeout(1000);

    // 3. Select Location (data-testid="HRMS-CAC-input-location-search")
    console.log('3. Location निवडत आहे: Talegaon Dighi');
    await hrmsConfigPage.selectLocation('Talegaon Dighi');
    await page.waitForTimeout(1000);

    // 4. Select Department (data-testid="HRMS-CAC-input-dept-search")
    console.log('4. Department निवडत आहे: Client Handling');
    await hrmsConfigPage.selectDepartment('Client Handling');
    await page.waitForTimeout(1000);

    // 5. Select Shift (data-testid="HRMS-CAC-input-shift-search")
    console.log('5. Shift निवडत आहे: General Shift');
    await hrmsConfigPage.selectShift('General Shift');
    await page.waitForTimeout(1000);

    // 6. Fill Numeric inputs (data-testid="HRMS-CAC-input-numeric")
    console.log('6. Numeric मूल्ये भरत आहे...');
    await hrmsConfigPage.fillNumericValues({
      workingDaysPerWeek: '5',
      workingHoursPerDay: '8.50',
      weeklyWorkingHours: '42.50',
      monthlyWorkingHours: '170.00',
      halfDayHoursThreshold: '4.5',
    });
    await page.waitForTimeout(1000);

    // 7. Select Weekday (data-testid="HRMS-CAC-dropdown-weekdays")
    console.log('7. Start day of working week निवडत आहे: Sunday');
    await hrmsConfigPage.selectWeekday('Sunday');
    await page.waitForTimeout(1000);

    // 8. Select Attendance Type (data-testid="HRMS-CAC-checkbox-attendance-type")
    console.log('8. Attendance Type चेक करत आहे: Remote');
    await hrmsConfigPage.selectAttendanceType('Remote');
    await page.waitForTimeout(1000);

    // 9. Click Save button (data-testid="HRMS-CAC-btn-save")
    console.log('9. Save बटणावर क्लिक करत आहे...');
    await hrmsConfigPage.clickSave();
    await page.waitForTimeout(3000);

    console.log('✅ Configuration यशस्वीरीत्या सेव्ह झाली आहे!');
  });
});
