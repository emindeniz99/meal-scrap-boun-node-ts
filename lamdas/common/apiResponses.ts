export const apiResponses = {
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

export default apiResponses;