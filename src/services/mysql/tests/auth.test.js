/* eslint-disable no-undef */
const { connection, errorHandler } = require('./setup')
const auth = require('../auth')({ connection, errorHandler })
const users = require('../users')({ connection, errorHandler })

describe('auth', () => {
    const create = (email) => {
		let userEmail = 'user@test.com'
		if (email) userEmail = email

		return users.save(userEmail, '123456')
	}

	beforeEach(() => {
		connection.query('TRUNCATE TABLE users')
	})
	
    afterAll(() => {
        connection.query('TRUNCATE TABLE users')
		connection.end()
    })

	it('should login successfully', async () => {
		await create('authuser@test.com')
		const result = await auth.authenticate('authuser@test.com', '123456')

		expect(result.token).not.toBe(null)
		expect(result.token.length).not.toBe(0)
	})

	it('should not login showing error', async () => {
		await create('existentuser@test.com')
		
		try {
			await auth.authenticate('nonexistentuser@test.com', '123456')
		} catch (error) {
			expect(error).toEqual({
				error: 'Falha ao localizar usuário'
			})
		}
	})
})
