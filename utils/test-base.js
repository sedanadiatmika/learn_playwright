const base = require('@playwright/test');

exports.customtest = base.test.extend({
    testDataForOrder: {
        email: "sd3@mail.com",
        password: "Sedanadiatmika123!",
        productName: "adidas original"
    }
})