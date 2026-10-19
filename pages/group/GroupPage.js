import { expect } from '@playwright/test';

export class GroupPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators based on data-testid attributes
    this.container = page.getByTestId('CG-container');
    this.searchContainer = page.getByTestId('CG-search-container');
    this.searchInput = page.getByTestId('CG-search-input');
    this.orgListContainer = page.getByTestId('CG-org-list-container');
    this.hierarchyDropdown = page.getByTestId('CG-hierarchy-dropdown-trigger');
  }

  /**
   * Verify Choose Organization / Group page is loaded
   */
  async verifyPageLoaded() {
    await expect(this.searchInput).toBeVisible({ timeout: 20000 });
  }

  /**
   * Type search term into organizations search bar
   * @param {string} orgName
   */
  async searchOrganization(orgName) {
    await this.searchInput.fill(orgName);
  }

  /**
   * Get organization card locator by name
   * @param {string} orgName
   */
  getOrgCard(orgName) {
    return this.page
      .locator('[data-testid^="CG-org-card-"]')
      .filter({ hasText: orgName })
      .first();
  }

  /**
   * Wait for next page to load after clicking organization
   */
  async waitForNextPage() {
    // Wait for the organization list container to disappear
    await this.container.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Search for an organization and click on it once it appears
   * @param {string} orgName
   */
  async selectOrganization(orgName) {
    // 1. Type in search bar
    await this.searchOrganization(orgName);

    // 2. Wait for filtered card to be visible
    const orgCard = this.getOrgCard(orgName);
    await expect(orgCard).toBeVisible({ timeout: 10000 });

    // 3. Click the organization card
    await orgCard.click();

    // 4. Wait for next page to load
    await this.waitForNextPage();
  }
}
