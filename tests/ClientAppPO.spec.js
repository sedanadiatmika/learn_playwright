const {test, chromium, expect} = require('@playwright/test');
const {customtest} = require('../utils/test-base')
const { POManager } = require('../pageobjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

// for(const data of dataSet) {
    customtest(`Client app for`, async ({page, testDataForOrder})=>
    {
        const poManager = new POManager(page);
        const firstName = "Sedana";
        const lastName = "Diatmika";
        const email = testDataForOrder.email;
        const phoneNumber = "8475917563";
        const password = testDataForOrder.password;

        const loginPage = poManager.getLoginPage();

        const productName = testDataForOrder.productName;

        await loginPage.goTo()
        await loginPage.validLogin(email, password);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProduct(productName);
        await dashboardPage.navigateToCart();

        await page.locator("div li").first().waitFor();
        const bool = await page.locator(`h3:has-text('${testDataForOrder.productName}')`).isVisible();
        expect(bool).toBeTruthy();

        await page.locator("div.subtotal button").click();
        await page.locator("[placeholder*='Country']").type("ind", {delay: 100});
        await expect(page.locator("section.ta-results button").nth(0)).toBeVisible();
        const dropwdown = page.locator(".ta-results");
        await dropwdown.waitFor();
        const countDrop = await dropwdown.locator("button").count();
        console.log(countDrop);

        for(let i = 0; i < countDrop; i++) {
            if (await dropwdown.locator("button").nth(i).textContent() === " Indonesia"){
                await dropwdown.locator("button").nth(i).click();
                break;
            }
        }

        await expect(page.locator(".user__name label")).toHaveText(email);
        page.locator("a.btnn").click();
        await expect(page.locator("h1")).toHaveText(" Thankyou for the order. ");
        let orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        const orderIdArray = orderId.split(" ")
        orderId = orderIdArray[2]
        console.log(orderId);

        await page.locator("button[routerlink*='order']").click();

        const orders = page.locator("tbody tr");
        await orders.first().waitFor();

        const countOrder = await orders.count();
        console.log(countOrder);

        for(let i = 0; i < countOrder; i++) {
            const textId = await orders.locator("th").nth(i).textContent();
            console.log(textId);
            if (textId === orderId){
                const orderLoc = orders.nth(i);
                await orderLoc.locator("button").nth(0).click();
                break;
            }
        }

        await expect(page.locator("div.col-text")).toHaveText(orderId);
    });

// }