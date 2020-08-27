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
	plugins: ["serverless-webpack", "serverless-offline"],
	provider: {
		name: "aws",
		runtime: "nodejs12.x",
		region: "eu-central-1",
		stage: "dev",
		apiGateway: {
			minimumCompressionSize: 1024,
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
		},
	},
	functions: {
		hello: {
			handler: "handler.hello",
			events: [
				{
					http: {
						method: "get",
						path: "/",
					},
				},
			],
		},
	},
}

module.exports = serverlessConfiguration
