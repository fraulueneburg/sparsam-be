const MonthlyBudget = require('../models/MonthlyBudget.model')
const DailyExpenses = require('../models/DailyExpenses.model')
const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/jwt.auth')

router.post('/', isAuthenticated, async (req, res) => {
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

router.put('/:categoryId', isAuthenticated, async (req, res) => {
	try {
		const userId = req.payload._id
		const updatedData = req.body.updatedCategory
		const categoryId = req.params.categoryId
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

router.delete('/:categoryId', isAuthenticated, async (req, res) => {
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

// DAILY EXPENSES IN CATEGORY

router.get('/:categoryId/daily-expenses', isAuthenticated, async (req, res) => {
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

router.post('/:categoryId/daily-expenses/move', isAuthenticated, async (req, res) => {
	try {
		const userId = req.payload._id
		const oldCategoryId = req.params.categoryId
		const newCategoryId = req.body.newCategoryId

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

router.delete('/:categoryId/daily-expenses', isAuthenticated, async (req, res) => {
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

module.exports = router
