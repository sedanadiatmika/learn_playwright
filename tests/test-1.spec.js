const {test, chromium, expect} = require('@playwright/test');


test('Browser Context PLaywright test', async ({page})=>
{
    await page.goto("https://test-1.solusisakti.xyz/");
    await page.waitForLoadState('networkidle') 
    await page.locator("input[name='username']").type("miko")
    await page.locator("input[name='password']").type("password.1")
    await page.locator("#btn-submit").click()
    await page.waitForLoadState('networkidle') 
    await page.goto("https://test-1.solusisakti.xyz/admin/cb/pegawai/daftar/create");
    await page.waitForLoadState('networkidle');
    await page.locator("#collector_birth_date").click();
    await page.locator('select.ui-datepicker-month').selectOption('3')
    await page.locator('select.ui-datepicker-year').selectOption('2000')
    await page.locator('a.ui-state-default:has-text("6")').first().click()
    await page.pause();
});
