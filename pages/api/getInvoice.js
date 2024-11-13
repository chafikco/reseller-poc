export default async function handler(req, res) {

    let transaction_id = req.body
    console.log(transaction_id)

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        'Accept':'application/json', 
        'Authorization':'Bearer 01ff9101ed8a0af9ba4344f6bfaecc9f7f131570d396b4b941', 
        },
    };


    //get sub data
    const response = await fetch(
		`https://sandbox-api.paddle.com/transactions/${transaction_id}/invoice`,
		requestOptions,
	);

	const invoiceUrl = await response.json();
    console.log(invoiceUrl)


	return res.status(200).json({ invoiceUrl });
}