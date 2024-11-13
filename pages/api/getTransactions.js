export default async function handler(req, res) {

    let customer_id = 'ctm_01jbrvhanpschjz74nqvcv9a0c'

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        'Accept':'application/json', 
        'Authorization':'Bearer 01ff9101ed8a0af9ba4344f6bfaecc9f7f131570d396b4b941', 
        },
    };


    //get sub data
    const response = await fetch(
		`https://sandbox-api.paddle.com/transactions?customer_id=${customer_id}&status=billed`,
		requestOptions,
	);

	const transactionData = await response.json();


	return res.status(200).json({ transactionData });
}