const { Schema, model } = require('mongoose')

const monthlyBudgetSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'user' },
		currency: {
			name: { type: String },
			code: { type: String },
			symbol: { type: String },
			space_between_amount_and_symbol: { type: Boolean },
			decimal_digits: { type: Number },
		},
		earnings: [{ name: { type: String }, amount: { type: Number } }],
		expenses: [{ name: { type: String }, amount: { type: Number } }],
		categories: [{ name: { type: String }, colour: { type: String } }],
	},
	{
		timestamps: true,
	}
)

const MonthlyBudget = model('MonthlyBudget', monthlyBudgetSchema)

module.exports = MonthlyBudget
