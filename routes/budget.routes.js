const MonthlyBudget = require('../models/MonthlyBudget.model')
const DailyExpenses = require('../models/DailyExpenses.model')
const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/jwt.auth')
const mongoose = require('mongoose')

// ---------------------------------------------------------------------------------------------------

// BUDGET

router.get('/', isAuthenticated, async (req, res) => {
	const userId = req.payload._id
	const foundMonthlyBudget = await MonthlyBudget.findOne({ user: userId })
	const foundDailyExpenses = await DailyExpenses.find({ user: userId })
	res.json({ respMonthlyBudget: foundMonthlyBudget, respDailyExpenses: foundDailyExpenses })
})

// BUDGET SETTINGS

router.get('/settings', isAuthenticated, async (req, res) => {
	const userId = req.payload._id
	const foundMonthlyBudget = await MonthlyBudget.findOne({ user: userId })
	res.json({ respMonthlyBudget: foundMonthlyBudget })
})

// UPDATE CURRENCY

router.post('/currency/update', isAuthenticated, async (req, res) => {
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

// ---------------------------------------------------------------------------------------------------

// ADD NEW EARNING

router.post('/earnings/add', isAuthenticated, async (req, res) => {
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

// UPDATE EARNING

router.post('/earnings/update', isAuthenticated, async (req, res) => {
	try {
		const userId = req.payload._id
		const updatedData = req.body.updatedEarning
		const earningId = updatedData._id

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

// DELETE EARNING

router.delete('/earnings/delete/:earningId', isAuthenticated, async (req, res) => {
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

// ---------------------------------------------------------------------------------------------------

// ADD NEW EXPENSE

router.post('/expenses/add', isAuthenticated, async (req, res) => {
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

// UPDATE EXPENSE

router.post('/expenses/update', isAuthenticated, async (req, res) => {
	try {
		const userId = req.payload._id
		const updatedData = req.body.updatedExpense
		const expenseId = updatedData._id

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

// DELETE EXPENSE

router.delete('/expenses/delete/:expenseId', isAuthenticated, async (req, res) => {
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

// ---------------------------------------------------------------------------------------------------

// ADD NEW CATEGORY

router.post('/categories/add', isAuthenticated, async (req, res) => {
	try {
		const userId = req.payload._id
		const newCategoriesArr = req.body.categories
		const budget = await MonthlyBudget.findOne({ user: userId })

		if (budget) {
			budget.categories = newCategoriesArr
			const updatedCategories = await budget.save()
			return res.status(200).json(updatedCategories)
		} else {
			const newBudget = await MonthlyBudget.create({
				user: userId,
				categories: newCategoriesArr,
			})
			return res.status(201).json(newBudget)
		}
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'BE Error while adding new category' })
	}
})

// UPDATE CATEGORY

router.post('/categories/update', isAuthenticated, async (req, res) => {
	try {
		const userId = req.payload._id
		const updatedData = req.body.updatedCategory
		const categoryId = updatedData._id
		const budget = await MonthlyBudget.findOneAndUpdate(
			{ user: userId, 'categories._id': categoryId },
			{
				$set: {
					'categories.$.name': updatedData.name,
					'categories.$.colour': updatedData.colour,
				},
			},
			{ new: true }
		)
		if (!budget) {
			return res.status(404).json({ message: 'Budget or category not found' })
		}
		res.status(200).json(budget)
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'BE Error while updating existing category' })
	}
})

// DELETE CATEGORY

// find expenses for category

router.get('/:categoryId/expenses', isAuthenticated, async (req, res) => {
	try {
		const userId = req.payload._id
		const categoryId = req.params.categoryId
		const foundExpensesArr = await DailyExpenses.find({ user: userId, category: categoryId })
		res.json({ foundExpensesArr })
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'BE Error while fetching category expenses' })
	}
})

// move expenses to new category

router.post('/:oldCategoryId/expenses/move/:newCategoryId', isAuthenticated, async (req, res) => {
	try {
		const userId = req.payload._id
		const oldCategoryId = req.params.oldCategoryId
		const newCategoryId = req.params.newCategoryId

		const updatedExpensesResult = await DailyExpenses.updateMany(
			{ user: userId, category: oldCategoryId },
			{
				$set: {
					category: newCategoryId,
				},
			},
			{ new: true }
		)
		if (!updatedExpensesResult) {
			return res.status(404).json({ message: 'Budget or category not found' })
		}
		res.status(200).json(updatedExpensesResult)
	} catch (err) {
		console.log('Error while moving expenses to a new category', err)
		res.status(500).json('Error while moving expenses to a new category')
	}
})

// delete expenses in category

router.delete('/:categoryId/expenses/delete', isAuthenticated, async (req, res) => {
	try {
		const userId = req.payload._id
		const categoryId = req.params.categoryId
		const deleteResult = await DailyExpenses.deleteMany({ user: userId, category: categoryId })

		return deleteResult.deletedCount === 0
			? res.status(404).json({ message: 'Found no expenses to delete in this category.' })
			: res.status(200).json({ message: `${deleteResult.deletedCount} expense(s) deleted successfully.` })
	} catch (err) {
		console.log('Error while deleting expenses within this category.', err)
		res.status(500).json('Error while deleting expenses within this category')
	}
})

// delete category

router.delete('/categories/delete/:categoryId', isAuthenticated, async (req, res) => {
	try {
		const userId = req.payload._id
		const categoryId = req.params.categoryId
		const updatedBudget = await MonthlyBudget.findOneAndUpdate(
			{ user: userId },
			{
				$pull: {
					categories: { _id: categoryId },
				},
			},
			{ new: true }
		)
		if (!updatedBudget) {
			return res.status(404).json({ message: 'Budget or category not found' })
		}
		res.status(200).json(updatedBudget)
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'BE Error while deleting existing category' })
	}
})

// ---------------------------------------------------------------------------------------------------

// ADD NEW DAILY EXPENSE

router.post('/addexpense', isAuthenticated, async (req, res) => {
	try {
		const userId = req.payload._id
		const dailyExpenseData = req.body
		const newDailyExpense = await DailyExpenses.create({
			date: dailyExpenseData.date,
			user: userId,
			category: new mongoose.Types.ObjectId(dailyExpenseData.category),
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
