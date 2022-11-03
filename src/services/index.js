const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
    // eslint-disable-next-line no-undef
    host: process.env.MYSQL_HOST,
    // eslint-disable-next-line no-undef
    user: process.env.MYSQL_USER,
    // eslint-disable-next-line no-undef
    password: process.env.MYSQL_PASSWORD,
    // eslint-disable-next-line no-undef
    database: process.env.MYSQL_DATABASE,
    // eslint-disable-next-line no-undef
    port: process.env.MYSQL_PORT
})

const errorHandler = (error, msg, rejectFunction) => {
    if (error) console.error(error)
    rejectFunction({ error: msg })
}

const categoryModule = require('./categories')({ connection, errorHandler })
const userModule = require('./users')({ connection, errorHandler })
const authModule = require('./auth')({ connection, errorHandler })

module.exports = {
    categories: () => categoryModule,
    users: () => userModule,
    auth: () => authModule
}
