const {test, chromium, expect} = require('@playwright/test');

test('Client app', async ({page})=>
{
    const firstName = "Sedana";
    const lastName = "Diatmika";
    const email = "sd3@mail.com";
    const phoneNumber = "8475917563";
    const password = "Sedanadiatmika123!";

    const productName = "adidas original";
    const products = page.locator(".card-body");

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("input[type='email']").type(email);
    await page.locator("input[type='password']").type(password);
    await page.locator("#login").click();

    // wait until all API request is done
    await page.waitForLoadState('networkidle');

    const count = await products.count();
    for(let i = 0; i < count; i++) {
        if (await products.nth(i).locator("b").textContent() === productName){
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('adidas original')").isVisible();
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
    // await page.locator(".form__cc input").first().fill("837482822943");
    // await page.locator("select.ddl").first().selectOption({ label: '4' });
    // await page.locator("select.ddl").nth(1).click().selectOption({ label: '24' });
    // await page.locator(".form__cc input").nth(1).fill("8586748756");
    // await page.locator(".form__cc input").nth(2).fill("Miko");
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


    // await page.pause();

    

});