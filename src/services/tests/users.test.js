/* eslint-disable no-undef */
const { connection, errorHandler } = require('./setup')
const users = require('../users')({ connection, errorHandler })

describe('users', () => {
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

	it('should create user', async () => {
		const result = await create()
		expect(result.user.email).toBe('user@test.com')
	})

    it('should update user', async () => {
		await create()
		const updated = await users.update(1, '654321')
		expect(updated.user.id).toBe(1)
		expect(updated.affectedRows).toBe(1)
	})

	it('should delete user', async () => {
		await create()
		const deleted = await users.del(1)
		expect(deleted.message).toBe('Usuário removido com sucesso')
		expect(deleted.affectedRows).toBe(1)
		expect(deleted.id).toBe(1)
	})

	it('should list users', async () => {
		await create()
		await create('user2@test.com')
		const list = await users.all()

		expect(list.users.length).toBe(2)
	})
})
