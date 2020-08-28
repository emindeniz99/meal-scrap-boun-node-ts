import { Document, Model, model, Types, Schema, Query } from "mongoose"

export interface IMeal extends Document {
	email: string
	firstName: string
}

const option: Schema = new Schema({
	name: {
		type: String,
	},
	link: {
		type: String,
	},
	// more:{
	// 	type: Schema.Types.ObjectId
	// }
})

const meal: Schema = new Schema({
	mealName: {
		type: String,
	},
	options: [
		{
			type: option,
		},
	],
})

const partOfDay: Schema = new Schema({
	tipi: {
		type: String,
	},
	meals: [
		{
			type: meal,
		},
	],
})

const DaySchema: Schema = new Schema({
	date: {
		// 2020-08-04T00:00:00.000Z
		type: String,
		required: true,
		unique: true,
	},
	weekday: {
		// Salı
		type: String,
		required: true,
	},
	meal: [
		// 0-1-2 öğünü de içeren array
		{
			type: partOfDay,
		},
	],
})

export default model<IMeal>("Day", DaySchema)
