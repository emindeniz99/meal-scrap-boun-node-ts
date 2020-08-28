import type { Serverless } from "serverless/aws"

const serverlessConfiguration: Serverless = {
	// app and org for use with dashboard.serverless.com
	org: "emindeniz99",
	app: "meal-scrap-boun-node-ts",
	service: {
		name: "meal-scrap-boun-node-ts",
	},
	frameworkVersion: ">=1.72.0",
	custom: {
		webpack: {
			webpackConfig: "./webpack.config.js",
			includeModules: true,
		},
	},
	// Add the serverless-webpack plugin
	plugins: [
		"serverless-dotenv-plugin",
		"serverless-webpack",
		"serverless-offline",
	],
	provider: {
		name: "aws",
		runtime: "nodejs12.x",
		region: "eu-central-1",
		stage: "dev",
		// profile:"serverlessUser"  for use default not define,
		apiGateway: {
			minimumCompressionSize: 1024,
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
		},
		// iamRoleStatements: [
		// 	{
		// 		Effect: "Allow",
		// 		Action: ["tranlate:*"],
		// 		Resource: "*",
		// 	},
		// ],
	},
	functions: {
		hello: {
			handler: "./handler.hello",
			events: [
				{
					http: {
						method: "get",
						path: "/",
					},
				},
			],
		},
		getCityInfo: {
			handler: "./lamdas/getCityInfo.handler",
			events: [
				{
					http: {
						path: "get-city/{city}",
						method: "get",
						cors: true,
					},
				},
			],
		},
		fetchMealList: {
			handler: "./lamdas/fetchMealList.handler",
			events: [
				{
					http: {
						path: "fetchMealList/{proxy+}",
						method: "get",
						cors: true,
					},
					
				},
				// {
				// 	schedule:"cron(0/2 * ? * MON-FRI *)"
				// }
				
			],
			environment: {
				MONGO_CONNECTION_STRING: "${env:ENVMONGO_CONNECTION_STRING}",
			},
			memorySize: 256,
			timeout: 60,
			
		},
		translate: {
			handler: "./lamdas/translate.handler",
			events: [
				{
					http: {
						path: "translate",
						method: "post",
						cors: true,
					},
				},
			],
		},
		info: {
			handler: "./lamdas/info.handler",
			events: [
				{
					http: {
						path: "info/{proxy+}",
						method: "get",
						cors: true,
					},
				},
			],
			environment: {
				MONGO_CONNECTION_STRING: "${env:ENVMONGO_CONNECTION_STRING}",
			},
			memorySize: 256,
			timeout: 60,
		},
	},
}

module.exports = serverlessConfiguration
