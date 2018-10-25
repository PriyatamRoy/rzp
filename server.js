const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.post('/payment-authorized', (req, res) => {
    console.log('PAYMENT AUTHORIZED');
    console.log(JSON.stringify(req.body));
	res.end();
});

app.listen(3001, () => {
    console.log("Server is listening on port 3000");
});