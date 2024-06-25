const {test, chromium, expect, request} = require('@playwright/test');


test.only('Browser Context PLaywright test', async ({browser})=>
{
    
    const context = await browser.newContext();
    const page = await context.newPage();

    // await page.route("**/*.css", route => route.abort());

    const cardTitle = await page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title())

    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));
    await userName.type("rahulshetty");
    await page.locator("#password").type("learning");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");

    await userName.fill("");
    await userName.fill("rahulshettyacademy");

    // race condition
    await Promise.all(
        page.waitForNavigation(),
        signIn.click()
    );
    

    // console.log(await cardTitle.first().textContent());
    // console.log(await cardTitle.nth(1).textContent());

    const allTitles = await cardTitle.allTextContents();
    console.log(allTitles);

});

test('Rahul Shetty practice', async ({page})=>
{
    const firstName = "Sedana";
    const lastName = "Diatmika";
    const email = "sd3@mail.com";
    const phoneNumber = "8475917563";
    const password = "Sedanadiatmika123!"

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("a.text-reset").click();
    await page.locator("#firstName").type(firstName);
    await page.locator("#lastName").type(lastName);
    await page.locator("#userEmail").type(email);
    await page.locator("#userMobile").type(phoneNumber);
    await page.locator("select[formcontrolname='occupation']").selectOption('3: Engineer');
    await page.locator("input[value='Male']").check();
    await page.locator("#userPassword").type(password);
    await page.locator("#confirmPassword").type(password);
    await page.locator("input[type='checkbox']").check();
    await page.locator("#login").click();

    await page.locator("button.btn").click();
    await page.locator("input[type='email']").type(email);
    await page.locator("input[type='password']").type(password);
    await page.locator("#login").click();

    // wait until all API request is done
    await page.waitForLoadState('networkidle');

    const firstProduct = await page.locator("div.card-body h5 b").first().textContent();
    
    console.log(firstProduct);
    // await page.pause();

});

test('UI handle', async ({page})=>
{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await dropdown.selectOption("teach");
    
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    console.log(await page.locator(".radiotextsty").last().isChecked());

    await expect(documentLink).toHaveAttribute("class", "blinkingText");

    // await page.pause();

});


test('child windows handle', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
    ]);

    const text = await newPage.locator(".im-para.red").textContent();
    const email = await newPage.locator("[href*=mail]").textContent();

    await page.pause();
    await page.locator("#username").type(email);

    console.log(await page.locator("#username").textContent());
    console.log(await page.locator("#username").textContent());
    console.log("haha hoihio");
    

});
