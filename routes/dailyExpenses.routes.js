const DailyExpenses = require('../models/DailyExpenses.model')
const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/jwt.auth')
const mongoose = require('mongoose')

router.post('/', isAuthenticated, async (req, res) => {
	try {
		const userId = req.payload._id
		const dailyExpenseData = req.body
		const newDailyExpense = await DailyExpenses.create({
			date: dailyExpenseData.date,
			user: userId,
			category: new mongoose.Types.ObjectId(dailyExpenseData.category),
			name: dailyExpenseData.name,
			amount: dailyExpenseData.amount,
			dateFieldUpdatedAt: new Date(),
		})
		res.status(201).json(newDailyExpense)
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'Error creating new expense' })
	}
})

router.put('/:dailyExpenseId', isAuthenticated, async (req, res) => {
	const { dailyExpenseId } = req.params
	const { category, name, amount } = req.body
	const date = new Date(req.body.date)
	const existingExpense = await DailyExpenses.findById(dailyExpenseId)
	const wasDateUpdated = existingExpense.date.getTime() !== date.getTime()

	const newExpenseData = {
		date: date,
		category: category,
		name: name,
		amount: amount,
		dateFieldUpdatedAt: wasDateUpdated ? new Date().toISOString() : existingExpense.dateFieldUpdatedAt,
	}
	try {
		const updatedExpense = await DailyExpenses.findByIdAndUpdate(dailyExpenseId, newExpenseData, { new: true })
		res.status(201).json(updatedExpense)
	} catch (err) {
		console.log(err)
	}
})

router.delete('/:dailyExpenseId', isAuthenticated, async (req, res) => {
	try {
		await DailyExpenses.findByIdAndDelete({ _id: req.params.dailyExpenseId })
		res.status(200).json({ message: 'Expense deleted successfully' })
	} catch (err) {
		console.log(err)
	}
})

module.exports = router
