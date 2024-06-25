class LoginPage {
    constructor(page) {
        this.page = page;
        this.signInButton = page.locator("#login");
        this.userEmail = page.locator("input[type='email']");
        this.password = page.locator("input[type='password']");
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client") 
    }

    async validLogin(email, password) {
        await this.userEmail.type(email);
        await this.password.type(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = {LoginPage};