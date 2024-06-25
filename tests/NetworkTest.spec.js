const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');

const loginPayLoad = {
    userEmail: "sd3@mail.com",
    userPassword: "Sedanadiatmika123!"
};
const orderPayLoad = {
    orders: [
      {
        country: "Indonesia",
        productOrderedId: "6262e990e26b7e1a10e89bfa"
      }
    ]
  };    
const fakePayLoadOrders = {data:[],message:"No Orders"};


let response;

test.beforeAll(async()=> {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);

});

test('API Client app', async ({page})=>
{
    const firstName = "Sedana";
    const lastName = "Diatmika";
    const email = "sd3@mail.com";
    const phoneNumber = "8475917563";
    const password = "Sedanadiatmika123!";

    const productName = "adidas original";
    const products = page.locator(".card-body");

    await page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");
    // await page.locator("input[type='email']").type(email);
    // await page.locator("input[type='password']").type(password);
    // await page.locator("#login").click();

    // // wait until all API request is done
    // await page.waitForLoadState('networkidle');

    

    // const count = await products.count();
    // for(let i = 0; i < count; i++) {
    //     if (await products.nth(i).locator("b").textContent() === productName){
    //         await products.nth(i).locator("text= Add To Cart").click();
    //         break;
    //     }
    // }

    // await page.locator("[routerlink*='cart']").click();
    // await page.locator("div li").first().waitFor();
    // const bool = await page.locator("h3:has-text('adidas original')").isVisible();
    // expect(bool).toBeTruthy();

    // await page.locator("div.subtotal button").click();
    // await page.locator("[placeholder*='Country']").type("ind", {delay: 100});
    // await expect(page.locator("section.ta-results button").nth(0)).toBeVisible();
    // const dropwdown = page.locator(".ta-results");
    // await dropwdown.waitFor();
    // const countDrop = await dropwdown.locator("button").count();
    // console.log(countDrop);

    // for(let i = 0; i < countDrop; i++) {
    //     if (await dropwdown.locator("button").nth(i).textContent() === " Indonesia"){
    //         await dropwdown.locator("button").nth(i).click();
    //         break;
    //     }
    // }

    // await expect(page.locator(".user__name label")).toHaveText(email);
    // // await page.locator(".form__cc input").first().fill("837482822943");
    // // await page.locator("select.ddl").first().selectOption({ label: '4' });
    // // await page.locator("select.ddl").nth(1).click().selectOption({ label: '24' });
    // // await page.locator(".form__cc input").nth(1).fill("8586748756");
    // // await page.locator(".form__cc input").nth(2).fill("Miko");
    // page.locator("a.btnn").click();
    // await expect(page.locator("h1")).toHaveText(" Thankyou for the order. ");
    // let orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    // const orderIdArray = orderId.split(" ")
    // orderId = orderIdArray[2]
    // console.log(orderId);
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/63a52d1f03841e9c9a5d8f55",
        async route=> {
            const response = await page.request.fetch(route.request());
            let body = fakePayLoadOrders;
            await route.fulfill(
                {
                    response,
                    body,
                }
            );
            //intercepting response - API response -> {fake response} -> browser -> render data on front end
        }
    );

    
    await page.locator("button[routerlink*='order']").click();
    await page.pause();
    


    // await page.pause();

    

});

//verify if order created is showing in history page
//precondition - create order

