import { APIGatewayProxyHandler } from "aws-lambda"
import "source-map-support/register"
import { apiResponses } from "./common/apiResponses"

import pureAxios from "axios"
import * as rateLimit from "axios-rate-limit"

import * as cheerio from "cheerio"

const axios = rateLimit(pureAxios.create(), {
	maxRequests: Number(process.env.MAXREQ),
	perMilliseconds: 1000,
})

const log = (...item) => {
	if (true) console.log(...item)
}

let counter = 0
interface mealsOfMonth {
	days?: Array<{
		date?: Date
		day?: number
		weekday?: string
		partOfDay?: Array<{
			type?: string
			meals?: Array<{
				mealName?: string
				options?: Array<{
					name?: string
					link?: string
					more?: {
						ingredients?: any
						// Array<string>
					}
					imageLink?: string
				}>
			}>
		}>
	}>
}

const getCalorieAndIn = async (href) => {
	try {
		const htmlData: string = await axios
			.get("https://yemekhane.boun.edu.tr" + href)
			.then((data) => {
				// log(data.data)
				return data.data
			})

		const $ = cheerio.load(htmlData)

		const ad = $(".page-title").text()

		const kalori = $(".field-name-field-kalori-miktar .field-item").text()

		const int = $(".field-name-field-i-indekiler2 .field-items .field-item")
			.toArray()
			.map((ch, ind) => {
				var str = $(ch).text()
				var patt2 = new RegExp(
					"[a-zA-ZığüşöçĞÜŞÖÇİ][a-zA-ZığüşöçĞÜŞÖÇİ ]+[a-zA-ZığüşöçĞÜŞÖÇİ]"
				)
				var patt3 = new RegExp("[0-9.]+")

				var res = patt2.exec(str)
				var r = patt3.exec(str)

				return {
					// todo
					// madde: res,
					// gram:r,
					full: $(ch).text(),
				}
			})
		return {
			ad,
			kalori,
			int,
		}
	} catch (error) {
		console.error("error happened", error, href)
		return {
			ad: "ERROR",
			kalori: 10,
			int: "2",
		}
	} finally {
		counter++
		log(counter, href)
	}
}

export const handler: APIGatewayProxyHandler = async (event, _context) => {
	const htmlData: string = await axios
		.get("https://yemekhane.boun.edu.tr/aylik-menu/2020-08")
		.then((data) => {
			return data.data
		})

	const $ = cheerio.load(htmlData)

	const mealsOfMonth: mealsOfMonth = {}
	mealsOfMonth.days = []

	mealsOfMonth.days = await Promise.all(
		$(".single-day [data-date]")
			.toArray()
			.map(async (singleDayCE) => {
				let ref = $(singleDayCE)

				let asd = await Promise.all(
					ref
						.find(".item")
						.toArray()
						.map(async (partOfDayCE) => {
							return {
								type: $(partOfDayCE)
									.find(".views-field-field-yemek-saati")
									.text(),
								meals: await Promise.all(
									[
										".views-field-field-ccorba",
										".views-field-field-anaa-yemek",
										".views-field-field-vejetarien",
										".views-field-field-yardimciyemek",
										".views-field-field-aperatiff",
									].map(async (mealClassName) => {
										return {
											mealName: mealClassName,
											options: await Promise.all(
												$(partOfDayCE)
													.find(mealClassName + " a ")
													.toArray()
													.map(
														async (
															optionOfMeal
														) => {
															return {
																name: $(
																	optionOfMeal
																).text(),
																link: $(
																	optionOfMeal
																).attr("href"),
																more: {
																	ingredients: await getCalorieAndIn(
																		$(
																			optionOfMeal
																		).attr(
																			"href"
																		)
																	),
																},
																imageLink:
																	"todo google it " +
																	$(
																		optionOfMeal
																	).text(),
															}
														}
													)
											),
										}
									})
								),
							}
						})
				)

				return {
					date: new Date(ref.attr("data-date")),
					day: Number(ref.attr("data-day-of-month")),
					weekday: ref.attr("headers"),
					partOfDay: asd,
				}
			})
	)
	return apiResponses._200(mealsOfMonth)
}
