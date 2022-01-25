const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)
const cookieParser = require('cookie-parser')

module.exports = ({ app, express }) => {
    express.appConfig = async () => {

        const storeSession = new MongoDBSession({
            uri: process.env.CYBERTY_MONGODB_URL,
            collection: 'cybertyMapleclubTopSessions'
        })

        app.use(express.static(`${process.cwd()}/views`))

        app.set('view engine', 'ejs')

        app.use(express.json())

        app.use(express.urlencoded({ extended: false }))

        app.use(
            session({
                secret: process.env.SESSION_SECRET,
                resave: false,
                saveUninitialized: false,
                store: storeSession,
                cookie: { maxAge: 1000 * 60 * 60 * 24 * 6 }, //6 Days
                name: 'CyberTy_Session'
            })
        )

        app.use(cookieParser())

    }
}
