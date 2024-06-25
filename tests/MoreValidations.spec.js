const {test, chromium, expect} = require('@playwright/test');

test.only('Pop up validations', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    await page.locator("#mousehover").hover();

    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click();
    
    const textCheck = await framePage.locator("div.text h2 span").textContent();
    console.log(textCheck);
});

test.only('Screenshot & Visual comparison', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: "Partialscreenshot.png"});
    await page.locator("#hide-textbox").click();
    
    await page.screenshot();
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();


});

test.only('visual', async ({page})=>
{
    await page.goto("https://flightware.com");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
});