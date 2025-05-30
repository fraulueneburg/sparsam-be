const MonthlyBudget = require('../models/MonthlyBudget.model')
const DailyExpenses = require('../models/DailyExpenses.model')
const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/jwt.auth')

// BUDGET

router.get('/', isAuthenticated, async (req, res) => {
	const userId = req.payload._id
	const excludeDailyExpenses = req.query.excludeDailyExpenses === 'true'

	const foundMonthlyBudget = await MonthlyBudget.findOne({ user: userId })
	let response = {
		respMonthlyBudget: foundMonthlyBudget,
	}

	if (!excludeDailyExpenses) {
		const foundDailyExpenses = await DailyExpenses.find({ user: userId })
		response.respDailyExpenses = foundDailyExpenses
	}

	res.json(response)
})

// CURRENCY

router.put('/currency', isAuthenticated, async (req, res) => {
	try {
		const userId = req.payload._id
		const newCurrency = req.body.currency
		const budget = await MonthlyBudget.findOne({ user: userId })

		if (budget) {
			budget.currency = newCurrency
			const updatedBudget = await budget.save()
			return res.status(200).json(updatedBudget)
		} else {
			const newBudget = await MonthlyBudget.create({
				user: userId,
				currency: newCurrency,
			})
			return res.status(201).json(newBudget)
		}
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: 'BE Error while updating currency' })
	}
})

// EARNINGS

router.post('/earnings', isAuthenticated, async (req, res) => {
	try {
		const userId = req.payload._id
		const newEarningsArr = req.body.earnings
		const budget = await MonthlyBudget.findOne({ user: userId })

		if (budget) {
			budget.earnings = newEarningsArr
			const updatedEarnings = await budget.save()
			return res.status(200).json(updatedEarnings)
		} else {
			const newBudget = await MonthlyBudget.create({
				user: userId,
				earnings: newEarningsArr,
			})
			return res.status(201).json(newBudget)
		}
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'BE Error while adding new earning' })
	}
})

router.put('/earnings/:earningId', isAuthenticated, async (req, res) => {
	try {
		const userId = req.payload._id
		const updatedData = req.body.updatedEarning
		const earningId = req.params.earningId

		const budget = await MonthlyBudget.findOneAndUpdate(
			{ user: userId, 'earnings._id': earningId },
			{
				$set: {
					'earnings.$.name': updatedData.name,
					'earnings.$.amount': updatedData.amount,
				},
			},
			{ new: true }
		)

		if (!budget) {
			return res.status(404).json({ message: 'Budget or earning not found' })
		}

		res.status(200).json(budget)
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'BE Error while updating existing earning' })
	}
})

router.delete('/earnings/:earningId', isAuthenticated, async (req, res) => {
	try {
		const userId = req.payload._id
		const earningId = req.params.earningId
		const budget = await MonthlyBudget.findOneAndUpdate(
			{ user: userId },
			{
				$pull: {
					earnings: { _id: earningId },
				},
			},
			{ new: true }
		)
		if (!budget) {
			return res.status(404).json({ message: 'Budget or earning not found' })
		}
		res.status(200).json(budget)
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'BE Error while deleting existing earning' })
	}
})

// EXPENSES

router.post('/expenses', isAuthenticated, async (req, res) => {
	try {
		const userId = req.payload._id
		const newExpensesArr = req.body.expenses
		const budget = await MonthlyBudget.findOne({ user: userId })

		if (budget) {
			budget.expenses = newExpensesArr
			const updatedExpenses = await budget.save()
			return res.status(200).json(updatedExpenses)
		} else {
			const newBudget = await MonthlyBudget.create({
				user: userId,
				expenses: newExpensesArr,
			})
			return res.status(201).json(newBudget)
		}
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'BE Error while adding new expense' })
	}
})

router.put('/expenses/:expenseId', isAuthenticated, async (req, res) => {
	try {
		const userId = req.payload._id
		const updatedData = req.body.updatedExpense
		const expenseId = req.params.expenseId

		const budget = await MonthlyBudget.findOneAndUpdate(
			{ user: userId, 'expenses._id': expenseId },
			{
				$set: {
					'expenses.$.name': updatedData.name,
					'expenses.$.amount': updatedData.amount,
				},
			},
			{ new: true }
		)

		if (!budget) {
			return res.status(404).json({ message: 'Budget or expense not found' })
		}

		res.status(200).json(budget)
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'BE Error while updating existing expense' })
	}
})

router.delete('/expenses/:expenseId', isAuthenticated, async (req, res) => {
	try {
		const userId = req.payload._id
		const expenseId = req.params.expenseId
		const budget = await MonthlyBudget.findOneAndUpdate(
			{ user: userId },
			{
				$pull: {
					expenses: { _id: expenseId },
				},
			},
			{ new: true }
		)
		if (!budget) {
			return res.status(404).json({ message: 'Budget or expense not found' })
		}
		res.status(200).json(budget)
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'BE Error while deleting existing expense' })
	}
})

module.exports = router
