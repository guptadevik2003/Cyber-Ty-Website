const mongoose = require('mongoose')

module.exports = ({ app, express }) => {
    express.mongooseLogin = async () => {

        mongoose.Promise = global.Promise
        mongoose.connect(process.env.CYBERTY_MONGODB_URL)

        mongoose.connection.on('connected', async () => {
            console.log(`Connected to Project Cyber Ty Bot Database.`)
        })

        mongoose.connection.on('disconnected', async () => {
            console.log(`Disconnected from Project Cyber Ty Bot Database.`)
        })

        mongoose.connection.on('err', async (error) => {
            console.log(error)
        })

    }
}
