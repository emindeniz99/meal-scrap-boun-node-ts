import { APIGatewayProxyHandler } from "aws-lambda"
import "source-map-support/register"
import apiResponses from "./common/apiResponses"
import Test from "./dbServices/service"
import { fetchMonth } from "./fetchMealList"

export const handler: APIGatewayProxyHandler = async (event, _context) => {
	const dodc = await Test.find({
"weekday": "Salı"

	  
        })
        return apiResponses._200({dodc})

	// const a = await fetchMonth()
	// await JSON.parse(a.body).days.map(async (d) => {

	// 	let test = new Test(d)
	// 	console.log(test._id)
	// 	await test.save(async (err: any) => {
	// 		if (err) console.log(err)
    //         // else return apiResponses._200({ test, event })
            
	// 	})
	// })

}
