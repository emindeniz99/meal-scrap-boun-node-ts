import { APIGatewayProxyHandler } from "aws-lambda"
import "source-map-support/register"

export const handler: APIGatewayProxyHandler = async (event, _context) => {
	const city = event.pathParameters?.city

	if (!city || !cityData[city]) {
		return apiResponses._400({
			message: "missing city or no data for that city",
		})
	}

	return apiResponses._200({data:cityData[city],input:event})
}

const apiResponses = {
	_200: (body: { [key: string]: any }) => {
		return {
			statusCode: 200,
			body: JSON.stringify(body, null, 2),
		}
	},
	_400: (body: { [key: string]: any }) => {
		return {
			statusCode: 400,
			body: JSON.stringify(body, null, 2),
		}
	},
	//  i cant do it
	// generic: (code: number): Function => {
	// 	return (body: { [key: string]: any }) => {
	// 		return {
	// 			statusCode: code,
	// 			body: JSON.stringify(body, null, 2),
	// 		}
	// 	}
	// },
}

interface CityData {
	name: string
	state: string
	description: string
	mayor: string
	population: number
	zipCodes?: string
}

const cityData: { [key: string]: CityData } = {
	newyork: {
		name: " New York",
		state: "New York",
		description: "Big city",
		mayor: "Bill",
		population: 10000,
	},
	istanbul: {
		name: " New York",
		state: "New York",
		description: "Big city",
		mayor: "Bill",
		population: 10000,
		zipCodes: "100,101,0555",
	},
	izmir: {
		name: " New York",
		state: "New York",
		description: "Big city",
		mayor: "Bill",
		population: 10000,
		zipCodes: "100,101,0555",
	},
}
