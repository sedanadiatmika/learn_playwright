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
    await page.locator("button[routerlink*='order']").click();
    await page.pause();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=63c4ff3b568c3e9fb1f8cd48",
        route => route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=63c61590568c3e9fb1f9bb89'})
    );

    await page.locator("button:has-text('View')").first().click();
    await page.pause();
    


    // await page.pause();

    

});

//verify if order created is showing in history page
//precondition - create order

