const mongoose = require('mongoose')

const dashboardSchema = new mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    botUserId: {
        type: String,
        required: true,
        unique: true
    },
    botUserName: {
        type: String
    },
    botUserTag: {
        type: String
    },
    botAvatar: {
        type: String
    },
    botUptime: {
        type: Number
    },
    botUptimeUpdatedAt: {
        type: Number
    },
    botWSPing: {
        type: Number
    },
    botGuildCount: {
        type: Number
    },
    botUserCount: {
        type: Number
    }

})

module.exports = mongoose.model('Dashboard', dashboardSchema, 'dashboard')
