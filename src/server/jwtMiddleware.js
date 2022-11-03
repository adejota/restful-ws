const jwt = require('jsonwebtoken')

const jwtMiddleware = (deps) => {
    return (req, res, next) => {
        if (!deps.exclusions.includes(req.href())) {
            const token = req.headers['x-access-token']
            if (!token) {
                res.send(403, { error: 'Token não fornecido' })
                return false
            }

            try {
                // eslint-disable-next-line no-undef
                req.decoded = jwt.verify(token, process.env.JWT_SECRET)
            } catch (error) {
                res.send(403, { error: 'Falha ao autenticar token' })
                return false
            }
        }

        next()
    }
}

module.exports = jwtMiddleware
