const sha1 = require('sha1')
const jwt = require('jsonwebtoken')

const auth = (deps) => {
    return {
        authenticate: (email, password) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                const queryString = 'SELECT id, email FROM users WHERE email = ? AND password = ?'
                const queryData = [email, sha1(password)]

                connection.query(queryString, queryData, (error, results) => {
                    if (error || !results.length) {
                        errorHandler(error, 'Falha ao localizar usuário', reject)
                        return
                    }

                    const { email, id } = results[0]

                    // eslint-disable-next-line no-undef
                    const token = jwt.sign({email, id}, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
                    
                    resolve({
                        token
                    })
                })
            })
        }
    }
}

module.exports = auth
