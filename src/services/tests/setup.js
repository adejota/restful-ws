require('dotenv').config();
const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
    // eslint-disable-next-line no-undef
    host: process.env.MYSQL_TEST_HOST,
    // eslint-disable-next-line no-undef
    user: process.env.MYSQL_TEST_USER,
    // eslint-disable-next-line no-undef
    password: process.env.MYSQL_TEST_PASSWORD,
    // eslint-disable-next-line no-undef
    database: process.env.MYSQL_TEST_DATABASE,
    // eslint-disable-next-line no-undef
    port: process.env.MYSQL_TEST_PORT
})

const errorHandler = (error, msg, rejectFunction) => {
    if (error) console.error(error)
    rejectFunction({ error: msg })
}

module.exports = {
    connection,
    errorHandler
}
