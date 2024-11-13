export default async function handler(req, res) {

    let params = await req.body
    console.log(params)

    let payload = {
        "items": [
            {
             "quantity": params.quantity,
            "price_id": params.priceId
            },
        ],
        "customer_id": "ctm_01jbrvhanpschjz74nqvcv9a0c",
        "address_id": "add_01jbrvjf5wxjasmnb487rdjw87",
        "business_id": "biz_01jbrvnc2f0e9z8jy29p9c8mxd",
        "status": "billed",
        "collection_mode": "manual",
        "billing_details": {
            "enable_checkout": false,
            // "purchase_order_number": "PO-123",
            "payment_terms": {
              "interval": "day",
              "frequency": 90
            }
          },
        "custom_data": {
            "resellerBuyerId": "9z8j1hji28mxd"
        },
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        'Accept':'application/json', 
        'Authorization':'Bearer 01ff9101ed8a0af9ba4344f6bfaecc9f7f131570d396b4b941', 
        },
        body: JSON.stringify(payload)
    };

    //transaction preview call
    const response = await fetch(
		`https://sandbox-api.paddle.com/transactions`,
		requestOptions,
	);

	const data = await response.json();
    console.log(data)
    // const manageData = data[0]
	return res.status(200).json({ data });
}