const db = require('../services')

const routes = (server) => {
    server.post('/auth', async (req, res, next) => {
        try {
            const { email, password } = req.params
            res.send(await db.auth().authenticate(email, password))
        } catch (error) {
            res.send(error)
        }

        next()
    })

    server.post('/user', async (req, res, next) => {
        const { email, password } = req.params
        
        try {
            res.send(await db.users().save(email, password))
        } catch (error) {
            res.send(error)
        }

        next()
    })

    server.get('/category', async (_req, res, next) => {
        try {
            res.send(await db.categories().all())
        } catch (error) {
            res.send(error)
        }

        next()
    })

    server.post('/category', async (req, res, next) => {
        const { name } = req.params
        
        try {
            res.send(await db.categories().save(name))
        } catch (error) {
            res.send(error)
        }

        next()
    })

    server.put('/category', async (req, res, next) => {
        const { id, name } = req.params

        try {
            res.send(await db.categories().update(id, name))
        } catch (error) {
            res.send(error)
        }

        next()
    })

    server.del('/category', async (req, res, next) => {
        const { id } = req.params

        try {
            res.send(await db.categories().del(id))
        } catch (error) {
            res.send(error)
        }

        next()
    })

    server.get('/', (_req, res, next) => {
        res.send('Server is running')
        next()
    })
}

module.exports = routes
