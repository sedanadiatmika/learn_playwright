class APIUtils {

    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayLoad
        });
        
        const loginResponseJson = await loginResponse.json();
        const token = await loginResponseJson.token;
        return token;
    }

    async createOrder(orderPayLoad) {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            },
            data: orderPayLoad
        });
        const orderRespopnseJson = await orderResponse.json();
        const orderId = await orderRespopnseJson.orders[0];
        response.orderId = orderId;
        
        return response;
    }



}

module.exports = {APIUtils};