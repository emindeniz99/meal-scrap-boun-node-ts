import { APIGatewayProxyHandler } from "aws-lambda"
import "source-map-support/register"
import apiResponses from "./common/apiResponses"

export const handler: APIGatewayProxyHandler = async (event, _context) => {
	const city = event.pathParameters?.city

	if (!city || !cityData[city]) {
		return apiResponses._400({
			message: "missing city or no data for that city",
		})
	}

	return apiResponses._200({ data: cityData[city], input: event })
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
