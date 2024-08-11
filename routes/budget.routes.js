const MonthlyBudget = require('../models/MonthlyBudget.model')
const DailyExpenses = require('../models/DailyExpenses.model')
const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/jwt.auth')

// BUDGET

router.get('/', isAuthenticated, async (req, res) => {
	const userId = req.payload._id
	const foundMonthlyBudget = await MonthlyBudget.find({ user: userId })
	const foundDailyExpenses = await DailyExpenses.find({ user: userId })
	res.json({ respMonthlyBudget: foundMonthlyBudget, respDailyExpenses: foundDailyExpenses })
})

// BUDGET SETTINGS

router.get('/settings', isAuthenticated, async (req, res) => {
	const userId = req.payload._id
	const foundMonthlyBudget = await MonthlyBudget.find({ user: userId })
	res.json({ respMonthlyBudget: foundMonthlyBudget })
})

// CREATE/UPDATE BUDGET

router.post('/create', isAuthenticated, async (req, res) => {
	try {
		const userId = req.payload._id
		const newBudgetData = req.body
		const budget = await MonthlyBudget.find({ user: userId })

		if (budget.length === 0) {
			const newBudget = await MonthlyBudget.create({
				user: userId,
				currency: newBudgetData.currency,
				earnings: newBudgetData.earnings,
				expenses: newBudgetData.expenses,
				spendingCategories: newBudgetData.spendingCategories,
			})
			res.status(201).json(newBudget)
		} else {
			const updatedBudget = await MonthlyBudget.findByIdAndUpdate(
				budget[0]._id,
				{
					currency: newBudgetData.currency,
					earnings: newBudgetData.earnings,
					expenses: newBudgetData.expenses,
					spendingCategories: newBudgetData.spendingCategories,
				},
				{ new: true }
			)
			res.status(201).json(updatedBudget)
			res.redirect(`/budget`)
		}
	} catch (err) {
		console.log(err)
	}
})

// ADD DAILY EXPENSE

router.post('/addexpense', isAuthenticated, async (req, res) => {
	try {
		const userId = req.payload._id
		const dailyExpenseData = req.body
		const newDailyExpense = await DailyExpenses.create({
			date: dailyExpenseData.date,
			user: userId,
			category: dailyExpenseData.category,
			name: dailyExpenseData.name,
			amount: dailyExpenseData.amount,
		})
		res.status(201).json(newDailyExpense)
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'Error creating new expense' })
	}
})

// UPDATE DAILY EXPENSE

router.post('/updateexpense/:dailyExpenseId', isAuthenticated, async (req, res) => {
	const expenseId = req.params.dailyExpenseId
	const updatedExpenseData = req.body

	try {
		const updatedExpense = await DailyExpenses.findByIdAndUpdate(
			expenseId,
			{
				date: updatedExpenseData.date,
				category: updatedExpenseData.category,
				name: updatedExpenseData.name,
				amount: updatedExpenseData.amount,
			},
			{ new: true }
		)
		res.status(201).json(updatedExpense)
		res.redirect(`/budget`)
	} catch (err) {
		console.log(err)
	}
})

// DELETE DAILY EXPENSE

router.delete('/deleteexpense/:dailyExpenseId', isAuthenticated, async (req, res) => {
	try {
		await DailyExpenses.findByIdAndDelete({ _id: req.params.dailyExpenseId })
		res.status(200).json({ message: 'Expense deleted successfully' })
	} catch (err) {
		console.log(err)
	}
})

module.exports = router
