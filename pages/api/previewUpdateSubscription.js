export default async function handler(req, res) {

    console.log(req.body)
    let subscription_id = req.body.sub_id
    let payload = {
        items: [
          {
            price_id: req.body.newPriceId,
            quantity: req.body.newQuantity
          }
        ],
        proration_billing_mode: "prorated_immediately"
      }

    

    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json',
        'Accept':'application/json', 
        'Authorization':'Bearer 01ff9101ed8a0af9ba4344f6bfaecc9f7f131570d396b4b941', 
        },
        body: JSON.stringify(payload)
    };


    //get sub data
    const response = await fetch(
		`https://sandbox-api.paddle.com/subscriptions/${subscription_id}/preview`,
		requestOptions,
	);

	const data = await response.json();
    console.log(data)


	return res.status(200).json({ data });
}