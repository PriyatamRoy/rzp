const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.post('/payment-authorized', (req, res) => {
	
	const url = getCaptureUrl(req.body.payload.payment.entity.id);

    axios.post(url, {
        amount: req.body.payload.payment.entity.amount
    })
    .then((r) => {
        return res.status(r.status).send({
            message: "Payment captured successfuly!"
        }); 
    })
    .catch((e) => {
        return res.status(e.response.status).send({
            message: e.message || "Some error occurred while capturing payment."
        });
    })
	
	
});

app.listen(3001, () => {
    console.log("Server is listening on port 3000");
});

function getCaptureUrl(paymentId) {
    let url = 'https://KEY_ID:KEY_SECRET@api.razorpay.com/v1/payments/PAYMENT_ID/capture';
    url = url.replace('KEY_ID', process.env.RAZORPAY_KEY_ID);
    url = url.replace('KEY_SECRET', process.env.RAZORPAY_KEY_SECRET);
    url = url.replace('PAYMENT_ID', paymentId);
    return url;
}