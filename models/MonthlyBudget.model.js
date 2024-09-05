const { Schema, model } = require('mongoose')

const monthlyBudgetSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'user' },
		currency: {
			code: { type: String },
			name: { type: String },
			symbol: { type: String },
			flag: { type: String },
			decimal_digits: { type: Number },
			number: { type: Number },
			name_plural: { type: String },
			thousands_separator: { type: String },
			decimal_separator: { type: String },
			space_between_amount_and_symbol: { type: Boolean },
			symbol_on_left: { type: Boolean },
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
