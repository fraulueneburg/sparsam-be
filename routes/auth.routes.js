const User = require('../models/User.model')
const MonthlyBudget = require('../models/MonthlyBudget.model')
const DailyExpenses = require('../models/DailyExpenses.model')
const bcrypt = require('bcryptjs')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('../middlewares/jwt.auth')

// SIGNUP ROUTE

router.post('/signup', async (req, res) => {
	const saltRounds = 13
	const salt = bcrypt.genSaltSync(saltRounds)
	const hash = bcrypt.hashSync(req.body.password, salt)

	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: hash,
	})
	const { _id, email } = await User.findOne({ email: req.body.email })
	const payload = { _id, email }

	const newBudget = await MonthlyBudget.create({
		user: payload._id,
		currency: req.body.currency,
		earnings: [],
		expenses: [],
		categories: [],
	})

	const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
		algorithm: 'HS256',
		expiresIn: '6h',
	})

	res.status(201).json({ newUser, authToken })
})

// NO-SIGNUP-SIGNUP ROUTE

router.post('/one-click-signup', async (req, res) => {
	const normalizeToMidnightUTC = (date) => {
		const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
		return utcDate.toISOString()
	}
	const subtractDaysFromToday = (numDays) => {
		const today = new Date()
		today.setUTCHours(0, 0, 0, 0)
		today.setUTCDate(today.getUTCDate() - numDays)
		return normalizeToMidnightUTC(today)
	}

	const dateToday = normalizeToMidnightUTC(new Date())
	const dateYesterday = subtractDaysFromToday(1)

	const randomNum = Math.floor(Math.random() * 10000)
	const saltRounds = 13
	const salt = bcrypt.genSaltSync(saltRounds)
	const hash = bcrypt.hashSync(randomNum.toString(), salt)

	const newUser = await User.create({
		name: `Manfred`,
		email: `manfred-${randomNum}@t-online.test`,
		password: hash,
		isTemporary: true,
	})
	const { _id, email } = await User.findOne({ email: newUser.email })
	const payload = { _id, email }

	const newBudget = await MonthlyBudget.create({
		user: payload._id,
		currency: req.body.currency,
		earnings: [
			{
				name: 'salary',
				amount: 2894,
			},
			{
				name: 'illegal basement casino',
				amount: 8000,
			},
		],
		expenses: [
			{
				name: 'Rent',
				amount: 798.34,
			},
			{
				name: 'gambling ring',
				amount: 8000,
			},
			{
				name: 'Utility bills',
				amount: 101.27,
			},
			{
				name: 'Internet',
				amount: 29.9,
			},
			{
				name: 'Phone',
				amount: 22.0,
			},
			{
				name: 'Netflix subscription',
				amount: 17.99,
			},
			{
				name: 'Gym Membership',
				amount: 39.99,
			},
			{
				name: 'Donations',
				amount: 120,
			},
		],
		categories: [
			{ name: 'Food', colour: 'pink' },
			{ name: 'Hobbies', colour: 'purple' },
			{ name: 'Party', colour: 'deep-purple' },
			{ name: 'Travel', colour: 'indigo' },
			{ name: 'Car', colour: 'blue' },
			{ name: 'Beauty', colour: 'cyan' },
			{ name: 'Pet', colour: 'green' },
			{ name: 'Medicine', colour: 'yellow' },
			{ name: 'Drunk Impulse Purchases', colour: 'orange' },
			{ name: 'Other', colour: 'blue-grey' },
		],
	})

	const categoryIds = newBudget.categories.map((category) => category._id)

	const newDailyExpenses = await DailyExpenses.create([
		{
			user: payload._id,
			date: dateToday,
			category: categoryIds[4],
			name: 'car wash',
			amount: 45.0,
		},
		{
			user: payload._id,
			date: dateToday,
			category: categoryIds[7],
			name: 'headache pills',
			amount: 9.99,
		},
		{
			user: payload._id,
			date: dateToday,
			category: categoryIds[6],
			name: 'hamster food',
			amount: 19.95,
		},
		{
			user: payload._id,
			date: dateYesterday,
			category: categoryIds[8],
			name: 'box of hamsters',
			amount: 120.0,
		},
		{
			user: payload._id,
			date: dateYesterday,
			category: categoryIds[2],
			name: 'even more drinks',
			amount: 50.0,
		},
		{
			user: payload._id,
			date: dateYesterday,
			category: categoryIds[2],
			name: 'more drinks',
			amount: 20,
		},
		{
			user: payload._id,
			date: dateYesterday,
			category: categoryIds[2],
			name: 'drinks',
			amount: 10,
		},
		{
			user: payload._id,
			date: subtractDaysFromToday(2),
			category: categoryIds[0],
			name: 'groceries',
			amount: 34.91,
		},
		{
			user: payload._id,
			date: subtractDaysFromToday(2),
			category: categoryIds[4],
			name: 'air refresher',
			amount: 1.99,
		},
		{
			user: payload._id,
			date: subtractDaysFromToday(5),
			category: categoryIds[0],
			name: 'groceries',
			amount: 14.29,
		},
		{
			user: payload._id,
			date: subtractDaysFromToday(8),
			category: categoryIds[4],
			name: 'car repair',
			amount: 124.0,
		},
		{
			user: payload._id,
			date: subtractDaysFromToday(10),
			category: categoryIds[6],
			name: 'cat food',
			amount: 19.99,
		},
		{
			user: payload._id,
			date: subtractDaysFromToday(14),
			category: categoryIds[1],
			name: 'ballet class',
			amount: 80.0,
		},
		{
			user: payload._id,
			date: subtractDaysFromToday(14),
			category: categoryIds[1],
			name: 'fishing gear',
			amount: 28.93,
		},
		{
			user: payload._id,
			date: subtractDaysFromToday(14),
			category: categoryIds[0],
			name: 'groceries',
			amount: 57.23,
		},
		{
			user: payload._id,
			date: subtractDaysFromToday(20),
			category: categoryIds[0],
			name: 'groceries',
			amount: 61.48,
		},
		{
			user: payload._id,
			date: subtractDaysFromToday(31),
			category: categoryIds[0],
			name: 'chocolate bar',
			amount: 1.49,
		},
		{
			user: payload._id,
			date: subtractDaysFromToday(31),
			category: categoryIds[7],
			name: 'nose surgery',
			amount: 1500,
		},
		{
			user: payload._id,
			date: subtractDaysFromToday(31),
			category: categoryIds[3],
			name: 'plane tickets',
			amount: 263.02,
		},
	])

	const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
		algorithm: 'HS256',
		expiresIn: '6h',
	})

	res.status(201).json({ newUser, authToken })
})

// LOGIN ROUTE

router.post('/login', async (req, res) => {
	try {
		const foundUser = await User.findOne({ email: req.body.email })

		if (foundUser) {
			const passwordMatch = bcrypt.compareSync(req.body.password, foundUser.password)
			if (passwordMatch) {
				const { _id, email } = foundUser
				const payload = { _id, email }
				const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
					algorithm: 'HS256',
					expiresIn: '6h',
				})

				res.status(200).json({ authToken })
			}
		} else {
			res.status(400).json({ errorMessage: 'Invalid arguments' })
		}
	} catch (err) {
		console.log(err)
	}
})

// VERIFY ROUTE FOR PROTECTED PAGE

router.get('/verify', isAuthenticated, (req, res) => {
	if (req.payload) {
		res.status(200).json({ user: req.payload })
	}
})

// EDIT PROFILE ROUTE

router.get('/profile', isAuthenticated, async (req, res) => {
	const userId = req.payload._id
	const userNeeded = await User.findById(userId)
	res.json({ userNeeded })
})

router.post('/profile', isAuthenticated, async (req, res) => {
	const userId = req.payload._id
	const newUserInfo = req.body
	const saltRounds = 13
	const salt = bcrypt.genSaltSync(saltRounds)
	const hash = bcrypt.hashSync(newUserInfo.password, salt)

	const updatedUser = await User.findByIdAndUpdate(
		userId,
		{
			name: newUserInfo.name,
			email: newUserInfo.email,
			password: hash,
		},
		{ new: true }
	)
	res.status(200).json({ updatedUser })
})

router.delete('/profile/delete', isAuthenticated, async (req, res) => {
	const userId = req.payload._id

	try {
		const dailyExpensesToDelete = await DailyExpenses.countDocuments({ user: userId })
		if (dailyExpensesToDelete > 0) {
			const dailyExpensesResult = await DailyExpenses.deleteMany({ user: userId })
			if (dailyExpensesResult.deletedCount < dailyExpensesToDelete) {
				return res.status(500).json({ message: 'Error: Not all daily expenses were removed.' })
			}
		}

		const monthlyBudgetToDelete = await MonthlyBudget.countDocuments({ user: userId })
		if (monthlyBudgetToDelete > 0) {
			const monthlyBudgetResult = await MonthlyBudget.deleteOne({ user: userId })
			if (monthlyBudgetResult.deletedCount === 0) {
				return res.status(500).json({ message: 'Error while deleting monthly budget. Document not removed.' })
			}
		}

		const userResult = await User.findByIdAndDelete(userId)
		if (!userResult) {
			return res.status(404).json({ message: 'Error while deleting user. User not found.' })
		}

		res.status(204).json({ message: 'User and associated data deleted successfully' })
	} catch (err) {
		console.error('Error while deleting user:', err.message)
		res.status(500).json({ message: `Error: ${err.message}` })
	}
})

module.exports = router
