const cron = require('node-cron')
const User = require('../models/User.model')
const DailyExpenses = require('../models/DailyExpenses.model')
const MonthlyBudget = require('../models/MonthlyBudget.model')

const startCronJob = () => {
	cron.schedule('0 1,13 * * *', async () => {
		try {
			const ttlHours = 24
			const cutoffDate = new Date()
			cutoffDate.setHours(cutoffDate.getHours() - ttlHours)

			const expiredUsers = await User.find({
				isTemporary: true,
				createdAt: { $lte: cutoffDate },
			})

			if (expiredUsers.length > 0) {
				const userIds = expiredUsers.map((user) => user._id)

				await DailyExpenses.deleteMany({ user: { $in: userIds } })
				await MonthlyBudget.deleteMany({ user: { $in: userIds } })
				await User.deleteMany({ _id: { $in: userIds } })

				console.log(`Deleted ${userIds.length} expired users and their associated records`)
			} else {
				console.log('No expired users found for deletion')
			}
		} catch (err) {
			console.error('Error deleting expired users and associated records:', err)
		}
	})
}

module.exports = { start: startCronJob }
