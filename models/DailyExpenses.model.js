const { Schema, model } = require('mongoose')

const dailyExpensesSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'user' },
		date: { type: Date, required: true },
		category: { type: Schema.Types.ObjectId, ref: 'monthlyBudget.categories', required: true },
		name: { type: String, required: true },
		amount: { type: Number, required: true },
		dateFieldUpdatedAt: { type: Date },
	},
	{
		timestamps: true,
	}
)

const DailyExpenses = model('DailyExpenses', dailyExpensesSchema)

module.exports = DailyExpenses
