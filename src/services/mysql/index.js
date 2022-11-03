
require('dotenv').config();
const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
    // eslint-disable-next-line no-undef
    host: 'us-cdbr-east-06.cleardb.net',
    // eslint-disable-next-line no-undef
    user: 'b723dbfcab1ae4',
    // eslint-disable-next-line no-undef
    password: '992dbf57',
    // eslint-disable-next-line no-undef
    database: 'heroku_4ead4a7bc445d9c',
    port: 3306,
    insecureAuth : true
})

const errorHandler = (error, msg, rejectFunction) => {
    if (error) console.error(error)
    rejectFunction({ error: msg })
}

const categoryModule = require('../categories')({ connection, errorHandler })
const userModule = require('../users')({ connection, errorHandler })
const authModule = require('../auth')({ connection, errorHandler })

module.exports = {
    categories: () => categoryModule,
    users: () => userModule,
    auth: () => authModule
}
