import { expect } from '@playwright/test';

export class MenuPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // --- Direct Menu Links ---
    this.dashboardLink = page.getByTestId('menu-item-click-dashboard');
    this.formBuilderLink = page.getByTestId('menu-item-click-form-builder');
    this.expenseLink = page.getByTestId('menu-item-click-expense');
    this.visitorManagementLink = page.getByTestId('menu-item-click-visitor-management');
    this.chatsLink = page.getByTestId('menu-item-click-chats');
    this.academicSettingsLink = page.getByTestId('menu-item-click-academic-settings');
    this.workflowLink = page.getByTestId('menu-item-click-workflow');
    this.linkAccountLink = page.getByTestId('menu-item-click-link-account');
    this.advertisementLink = page.getByTestId('menu-item-click-advertisement');

    // --- Main Accordion Menu Buttons ---
    this.myHrmsButton = page.locator('[data-testid="menu-item-my-hrms"]').or(page.getByRole('button', { name: /My HRMS/i })).first();
    this.payrollManagementButton = page.getByTestId('menu-item-payroll-management');
    this.loanManagementButton = page.getByTestId('menu-item-loan-management');
    this.kraManagementButton = page.getByTestId('menu-item-kra-management');
    this.performanceButton = page.getByTestId('menu-item-performance');
    this.jobButton = page.getByTestId('menu-item-job');
    this.interviewButton = page.getByTestId('menu-item-interview');
    this.admissionFeesButton = page.getByTestId('menu-item-admission-&-fees');
    this.certificatesButton = page.getByTestId('menu-item-certificates');
    this.documentButton = page.getByTestId('menu-item-document');
    this.assignmentButton = page.getByTestId('menu-item-assignment');
    this.timetableButton = page.getByTestId('menu-item-timetable');
    this.examButton = page.getByTestId('menu-item-exam');
    this.libraryButton = page.getByTestId('menu-item-library');
    this.syllabusPlannerButton = page.getByTestId('menu-item-syllabus-planner');
    this.transportButton = page.getByTestId('menu-item-transport');
    this.hostelButton = page.getByTestId('menu-item-hostel');
    this.fineManagementButton = page.getByTestId('menu-item-fine-management');
    this.toolsButton = page.getByTestId('menu-item-tools');
    this.crmButton = page.getByTestId('menu-item-crm');
    this.projectManagementButton = page.getByTestId('menu-item-project-management');
    this.vendorManagementButton = page.getByTestId('menu-item-vendor-management');
    this.qualityControlButton = page.getByTestId('menu-item-quality-control');
    this.inventoryManagementButton = page.getByTestId('menu-item-inventory-management');
    this.productionButton = page.getByTestId('menu-item-production');
    this.salesDistributionButton = page.getByTestId('menu-item-sales-&-distribution');
    this.dispatchErpButton = page.getByTestId('menu-item-dispatch-erp');
    this.installationButton = page.getByTestId('menu-item-installation');
    this.assetManagementButton = page.getByTestId('menu-item-asset-management');
    this.commercialManagementButton = page.getByTestId('menu-item-commercial-management');
    this.appointmentsButton = page.getByTestId('menu-item-appointments');
    this.bulkUploadButton = page.getByTestId('menu-item-bulk-upload');
    this.reportsButton = page.getByTestId('menu-item-reports');
    this.invoiceButton = page.getByTestId('menu-item-invoice');
    this.webhooksButton = page.getByTestId('menu-item-webhooks');
    this.notificationSettingsButton = page.getByTestId('menu-item-notification-settings');
    this.userManagementButton = page.getByTestId('menu-item-user-management');
    this.organizationSettingsButton = page.getByTestId('menu-item-organization-settings');
    this.driveButton = page.getByTestId('menu-item-drive');
    this.postButton = page.getByTestId('menu-item-post');
    this.taxManagementButton = page.getByTestId('menu-item-tax-management');

    // --- Submenu Containers ---
    this.myHrmsSubmenu = page.getByTestId('submenu-container-my-hrms');
    this.payrollSubmenu = page.getByTestId('submenu-container-payroll-management');
    this.loanSubmenu = page.getByTestId('submenu-container-loan-management');
    this.kraSubmenu = page.getByTestId('submenu-container-kra-management');
    this.performanceSubmenu = page.getByTestId('submenu-container-performance');
    this.jobSubmenu = page.getByTestId('submenu-container-job');
    this.interviewSubmenu = page.getByTestId('submenu-container-interview');
    this.admissionFeesSubmenu = page.getByTestId('submenu-container-admission-&-fees');
    this.certificatesSubmenu = page.getByTestId('submenu-container-certificates');
    this.documentSubmenu = page.getByTestId('submenu-container-document');
    this.assignmentSubmenu = page.getByTestId('submenu-container-assignment');
    this.timetableSubmenu = page.getByTestId('submenu-container-timetable');
    this.examSubmenu = page.getByTestId('submenu-container-exam');
    this.librarySubmenu = page.getByTestId('submenu-container-library');
    this.syllabusPlannerSubmenu = page.getByTestId('submenu-container-syllabus-planner');
    this.transportSubmenu = page.getByTestId('submenu-container-transport');
    this.hostelSubmenu = page.getByTestId('submenu-container-hostel');
    this.fineManagementSubmenu = page.getByTestId('submenu-container-fine-management');
    this.toolsSubmenu = page.getByTestId('submenu-container-tools');
    this.crmSubmenu = page.getByTestId('submenu-container-crm');
    this.projectManagementSubmenu = page.getByTestId('submenu-container-project-management');
    this.vendorManagementSubmenu = page.getByTestId('submenu-container-vendor-management');
    this.qualityControlSubmenu = page.getByTestId('submenu-container-quality-control');
    this.inventoryManagementSubmenu = page.getByTestId('submenu-container-inventory-management');
    this.productionSubmenu = page.getByTestId('submenu-container-production');
    this.salesDistributionSubmenu = page.getByTestId('submenu-container-sales-&-distribution');
    this.dispatchErpSubmenu = page.getByTestId('submenu-container-dispatch-erp');
    this.installationSubmenu = page.getByTestId('submenu-container-installation');
    this.assetManagementSubmenu = page.getByTestId('submenu-container-asset-management');
    this.commercialManagementSubmenu = page.getByTestId('submenu-container-commercial-management');
    this.appointmentsSubmenu = page.getByTestId('submenu-container-appointments');
    this.bulkUploadSubmenu = page.getByTestId('submenu-container-bulk-upload');
    this.reportsSubmenu = page.getByTestId('submenu-container-reports');
    this.invoiceSubmenu = page.getByTestId('submenu-container-invoice');
    this.webhooksSubmenu = page.getByTestId('submenu-container-webhooks');
    this.notificationSettingsSubmenu = page.getByTestId('submenu-container-notification-settings');
    this.userManagementSubmenu = page.getByTestId('submenu-container-user-management');
    this.organizationSettingsSubmenu = page.getByTestId('submenu-container-organization-settings');
    this.driveSubmenu = page.getByTestId('submenu-container-drive');
    this.postSubmenu = page.getByTestId('submenu-container-post');
    this.taxManagementSubmenu = page.getByTestId('submenu-container-tax-management');

    // --- My HRMS Submenu Links ---
    this.hrmsAttendance = page.locator('[data-testid="submenu-item-attendance"]').or(page.getByRole('link', { name: 'Attendance', exact: true })).first();
    this.hrmsTeamRequests = page.locator('[data-testid="submenu-item-team-requests"]').or(page.getByRole('link', { name: 'Team Requests', exact: true })).first();
    this.hrmsLeaveManagement = page.locator('[data-testid="submenu-item-leave-management"]').or(page.getByRole('link', { name: 'Leave Management', exact: true })).first();
    this.hrmsConfiguration = page.locator('[data-testid="submenu-item-hrms-configuration"]').or(page.getByRole('link', { name: 'HRMS Configuration', exact: true })).first();
    this.hrmsProductivityTracker = page.locator('[data-testid="submenu-item-productivity-tracker"]').or(page.getByRole('link', { name: 'Productivity Tracker', exact: true })).first();
    this.hrmsDailyBulkUpload = page.locator('[data-testid="submenu-item-daily-bulk-upload"]').or(page.getByRole('link', { name: 'Daily Bulk Upload', exact: true })).first();
    this.hrmsMonthlyBulkUpload = page.locator('[data-testid="submenu-item-monthly-bulk-upload"]').or(page.getByRole('link', { name: 'Monthly Bulk Upload', exact: true })).first();
    this.hrmsMonthlyAttendanceSummary = page.locator('[data-testid="submenu-item-monthly-attendance-summary"]').or(page.getByRole('link', { name: 'Monthly Attendance Summary', exact: true })).first();
  }

  /**
   * Click any menu item by its full or partial data-testid
   * @param {string} testId
   */
  async clickByTestId(testId) {
    const element = this.page.getByTestId(testId);
    await expect(element).toBeVisible({ timeout: 10000 });
    await element.click();
  }

  /**
   * Click main menu item by key name
   * e.g. clickMenuItem('my-hrms') clicks 'menu-item-my-hrms'
   * @param {string} name
   */
  async clickMenuItem(name) {
    const locator = this.page.locator(`[data-testid="menu-item-${name}"], [data-testid="menu-item-click-${name}"]`);
    await expect(locator).toBeVisible({ timeout: 10000 });
    await locator.click();
  }

  /**
   * Click submenu item by key name
   * e.g. clickSubMenuItem('hrms-configuration') clicks 'submenu-item-hrms-configuration'
   * @param {string} name
   */
  async clickSubMenuItem(name) {
    const locator = this.page.getByTestId(`submenu-item-${name}`);
    await expect(locator).toBeVisible({ timeout: 10000 });
    await locator.click();
  }

  /**
   * Helper: Click Dashboard link
   */
  async clickDashboard() {
    await this.dashboardLink.click();
  }

  /**
   * Helper: Click My HRMS and expand submenu
   */
  async clickMyHrms() {
    await this.myHrmsButton.scrollIntoViewIfNeeded().catch(() => {});
    await expect(this.myHrmsButton).toBeVisible({ timeout: 10000 });
    await this.myHrmsButton.click();
  }

  /**
   * Helper: Click HRMS Configuration under My HRMS
   */
  async clickHrmsConfiguration() {
    // जर सबमेनू उघडलेला नसेल तर आधी My HRMS बटणावर क्लिक करा
    const isSubmenuVisible = await this.hrmsConfiguration.isVisible().catch(() => false);
    if (!isSubmenuVisible) {
      await this.clickMyHrms();
      await expect(this.hrmsConfiguration).toBeVisible({ timeout: 5000 });
    }
    await this.hrmsConfiguration.scrollIntoViewIfNeeded().catch(() => {});
    await expect(this.hrmsConfiguration).toBeVisible({ timeout: 5000 });
    await this.hrmsConfiguration.click();
  }

  /**
   * Helper: Click Attendance under My HRMS
   */
  async clickAttendance() {
    const isSubmenuVisible = await this.hrmsAttendance.isVisible().catch(() => false);
    if (!isSubmenuVisible) {
      await this.clickMyHrms();
      await expect(this.hrmsAttendance).toBeVisible({ timeout: 5000 });
    }
    await this.hrmsAttendance.click();
  }

  /**
   * Helper: Click Leave Management under My HRMS
   */
  async clickLeaveManagement() {
    const isSubmenuVisible = await this.hrmsLeaveManagement.isVisible().catch(() => false);
    if (!isSubmenuVisible) {
      await this.clickMyHrms();
      await expect(this.hrmsLeaveManagement).toBeVisible({ timeout: 5000 });
    }
    await this.hrmsLeaveManagement.click();
  }

  /**
   * Helper: Click Organization Settings and open a sub-setting
   * @param {string} subItemName e.g. 'basic-details', 'shift-management', 'leave-configuration'
   */
  async clickOrganizationSetting(subItemName) {
    const subItem = this.page.getByTestId(`submenu-item-${subItemName}`);
    const isVisible = await subItem.isVisible().catch(() => false);
    if (!isVisible) {
      await this.organizationSettingsButton.click();
      await expect(subItem).toBeVisible({ timeout: 5000 });
    }
    await subItem.click();
  }
}
