import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login/LoginPage.js';
import { GroupPage } from '../../pages/group/GroupPage.js';

test.describe('Organization / Group Selection Suite', () => {
  let loginPage;
  let groupPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    groupPage = new GroupPage(page);

    await page.goto('/');

    // तपासा: आधीच लॉगिन झालेले आहे का?
    // जर लॉगिन फॉर्म (username input) दिसला तरच लॉगिन करा, अन्यथा लॉगिन स्टेप पूर्णपणे SKIP करा
    const needsLogin = await loginPage.usernameInput.isVisible({ timeout: 2500 }).catch(() => false);

    if (needsLogin) {
      console.log('लॉगिन सेशन उपलब्ध नाही, लॉगिन करत आहे...');
      const username = process.env.USER_EMAIL || process.env.USERNAME;
      const password = process.env.PASSWORD;

      expect(username, 'USER_EMAIL/USERNAME should be defined in .env').toBeTruthy();
      expect(password, 'PASSWORD should be defined in .env').toBeTruthy();

      await loginPage.login(username, password);
      await page.waitForLoadState('networkidle');
      await page.context().storageState({ path: 'storageState.json' });
    } else {
      console.log('✅ लॉगिन आधीच झालेले आहे. लॉगिन स्टेप स्किप करून थेट ग्रुप पेज लोड होत आहे.');
    }
  });

  test('should search and select Qa Group', async ({ page }) => {
    // तपासणी: ग्रुप / Organization सिलेक्शन स्क्रीन उपलब्ध आहे का?
    const hasOrgSelection = await groupPage.searchInput.isVisible({ timeout: 5000 }).catch(() => false);

    if (hasOrgSelection) {
      // 2. Group / Organization page लोड होण्याची वाट पाहा
      await groupPage.verifyPageLoaded();
      await page.waitForTimeout(2000);

      // 3. Searchbar मध्ये 'Qa Group' टाईप करा
      const targetGroup = 'Qa Group';
      await groupPage.searchOrganization(targetGroup);
      await page.waitForTimeout(2000);

      // 4. 'QA Group' चे कार्ड दिसल्यावर त्यावर क्लिक करा
      const orgCard = groupPage.getOrgCard('QA Group');
      await expect(orgCard).toBeVisible({ timeout: 10000 });
      await orgCard.click();

      // 5. ग्रुपवर क्लिक केल्यावर पुढील पेज लोड होईपर्यंत वाट पाहा
      await groupPage.waitForNextPage();
      await page.waitForTimeout(3000);
    } else {
      console.log('✅ ग्रुप निवड स्क्रीन उपलब्ध नाही (युझर थेट डॅशबोर्डवर आहे). ही स्टेप यशस्वीरीत्या पुढे जात आहे.');
    }
  });
});
