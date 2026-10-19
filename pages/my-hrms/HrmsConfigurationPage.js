import { expect } from '@playwright/test';

export class HrmsConfigurationPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // --- Main List Page Elements ---
    this.heading = page.getByRole('heading', { name: 'HRMS Configuration' }).or(page.locator('text=HRMS Configuration')).first();
    this.attendanceConfigTab = page.getByRole('button', { name: 'Attendance Configuration' }).or(page.locator('text=Attendance Configuration')).first();
    this.regularizationConfigTab = page.getByRole('button', { name: 'Regularization Configuration' }).or(page.locator('text=Regularization Configuration')).first();
    this.productivityConfigTab = page.getByRole('button', { name: 'Productivity Configuration' }).or(page.locator('text=Productivity Configuration')).first();
    this.compoffConfigTab = page.getByRole('button', { name: 'Compoff configuration' }).or(page.locator('text=Compoff configuration')).first();
    this.creditLeavesButton = page.getByRole('button', { name: 'Credit Leaves' }).or(page.locator('button:has-text("Credit Leaves")')).first();
    this.searchInput = page.getByPlaceholder('Search configurations').or(page.locator('input[placeholder*="Search"]')).first();

    // Add button on list page
    this.addButton = page.getByRole('button', { name: 'Add', exact: true }).or(page.locator('button:has-text("Add")')).first();

    // --- Create Configuration Form Elements (Using provided test-ids) ---
    this.configNameInput = page.getByTestId('HRMS-CAC-input-config-name').or(page.locator('input[placeholder*="Name"], input[name*="name"]')).first();
    this.locationSearchInput = page.getByTestId('HRMS-CAC-input-location-search').or(page.locator('input[placeholder*="Location"], input[name*="location"]')).first();
    this.deptSearchInput = page.getByTestId('HRMS-CAC-input-dept-search').or(page.locator('input[placeholder*="Department"], input[name*="dept"]')).first();
    this.shiftSearchInput = page.getByTestId('HRMS-CAC-input-shift-search').or(page.locator('input[placeholder*="Shift"], input[name*="shift"]')).first();

    // Numeric inputs
    this.numericInputs = page.getByTestId('HRMS-CAC-input-numeric');

    // Weekdays dropdown
    this.weekdaysDropdown = page.getByTestId('HRMS-CAC-dropdown-weekdays');

    // Attendance type checkboxes
    this.attendanceTypeCheckboxes = page.getByTestId('HRMS-CAC-checkbox-attendance-type');

    // Action buttons
    this.saveButton = page.getByTestId('HRMS-CAC-btn-save').or(page.getByRole('button', { name: 'Save' })).first();
    this.cancelButton = page.getByRole('button', { name: 'Cancel' }).or(page.locator('button:has-text("Cancel")')).first();
  }

  /**
   * Verify HRMS Configuration page is loaded
   */
  async verifyPageLoaded() {
    await expect(this.heading).toBeVisible({ timeout: 15000 });
    await expect(this.addButton).toBeVisible({ timeout: 15000 });
  }

  /**
   * Click the Add button to open Create Configuration
   */
  async clickAddButton() {
    await this.addButton.scrollIntoViewIfNeeded().catch(() => {});
    await expect(this.addButton).toBeVisible({ timeout: 10000 });
    await this.addButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Fill Configuration Name
   * @param {string} name
   */
  async fillConfigName(name) {
    await this.configNameInput.scrollIntoViewIfNeeded().catch(() => {});
    await expect(this.configNameInput).toBeVisible({ timeout: 10000 });
    await this.configNameInput.click();
    await this.configNameInput.fill(name);
  }

  /**
   * Search and select Location
   * @param {string} locationName
   */
  async selectLocation(locationName) {
    await this.locationSearchInput.scrollIntoViewIfNeeded().catch(() => {});
    await expect(this.locationSearchInput).toBeVisible({ timeout: 10000 });
    await this.locationSearchInput.click();
    await this.locationSearchInput.fill(locationName);
    await this.page.waitForTimeout(600);

    const option = this.page.locator('.dropdown-item, [role="option"], li, div').filter({ hasText: locationName }).first();
    if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
      await option.click();
    } else {
      await this.locationSearchInput.press('Enter');
    }
  }

  /**
   * Search and select Department
   * @param {string} deptName
   */
  async selectDepartment(deptName) {
    await this.deptSearchInput.scrollIntoViewIfNeeded().catch(() => {});
    await expect(this.deptSearchInput).toBeVisible({ timeout: 10000 });
    await this.deptSearchInput.click();
    await this.deptSearchInput.fill(deptName);
    await this.page.waitForTimeout(600);

    const option = this.page.locator('.dropdown-item, [role="option"], li, div').filter({ hasText: deptName }).first();
    if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
      await option.click();
    } else {
      await this.deptSearchInput.press('Enter');
    }
  }

  /**
   * Search and select Shift
   * @param {string} shiftName
   */
  async selectShift(shiftName) {
    await this.shiftSearchInput.scrollIntoViewIfNeeded().catch(() => {});
    await expect(this.shiftSearchInput).toBeVisible({ timeout: 10000 });
    await this.shiftSearchInput.click();
    await this.shiftSearchInput.fill(shiftName);
    await this.page.waitForTimeout(600);

    const option = this.page.locator('.dropdown-item, [role="option"], li, div').filter({ hasText: shiftName }).first();
    if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
      await option.click();
    } else {
      await this.shiftSearchInput.press('Enter');
    }
  }

  /**
   * Fill numeric inputs (working days, working hours, etc.)
   * @param {Object} [values]
   */
  async fillNumericValues(values = {}) {
    const inputs = this.numericInputs;
    const count = await inputs.count();

    const defaults = [
      values.workingDaysPerWeek ?? '5',
      values.workingHoursPerDay ?? '8.50',
      values.weeklyWorkingHours ?? '42.50',
      values.monthlyWorkingHours ?? '170.00',
      values.halfDayHoursThreshold ?? '4.5'
    ];

    for (let i = 0; i < Math.min(count, defaults.length); i++) {
      if (defaults[i] !== undefined) {
        await inputs.nth(i).click();
        await inputs.nth(i).fill(defaults[i].toString());
      }
    }
  }

  /**
   * Select Start day of working week
   * @param {string} [dayName] e.g. 'Sunday' or 'Monday'
   */
  async selectWeekday(dayName = 'Sunday') {
    if (await this.weekdaysDropdown.isVisible({ timeout: 3000 }).catch(() => false)) {
      const tagName = await this.weekdaysDropdown.evaluate(el => el.tagName.toLowerCase()).catch(() => '');
      if (tagName === 'select') {
        await this.weekdaysDropdown.selectOption({ label: dayName }).catch(async () => {
          await this.weekdaysDropdown.selectOption(dayName);
        });
      } else {
        await this.weekdaysDropdown.click();
        const option = this.page.locator('[role="option"], li, div').filter({ hasText: dayName }).first();
        if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
          await option.click();
        }
      }
    }
  }

  /**
   * Check Attendance Type checkbox (e.g. 'Remote')
   * @param {string} [typeName]
   */
  async selectAttendanceType(typeName = 'Remote') {
    const label = this.page.locator('label').filter({ hasText: typeName }).first();
    if (await label.isVisible({ timeout: 3000 }).catch(() => false)) {
      await label.click();
      return;
    }

    const checkbox = this.page.getByRole('checkbox', { name: typeName }).or(
      this.page.locator(`[data-testid="HRMS-CAC-checkbox-attendance-type"]:has-text("${typeName}")`)
    ).first();
    if (await checkbox.isVisible({ timeout: 3000 }).catch(() => false)) {
      await checkbox.check().catch(async () => await checkbox.click());
    }
  }

  /**
   * Click Save button
   */
  async clickSave() {
    await this.saveButton.scrollIntoViewIfNeeded().catch(() => {});
    await expect(this.saveButton).toBeVisible({ timeout: 10000 });
    await this.saveButton.click();
  }
}
