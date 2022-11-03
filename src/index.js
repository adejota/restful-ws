require('dotenv').config();
const server = require('./server')

// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000

server.listen(port)
