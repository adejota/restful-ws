/* eslint-disable no-undef */
const { connection, errorHandler } = require('./setup')
const categories = require('../categories')({ connection, errorHandler })

describe('categories', () => {
    const create = () => categories.save('category-test')

	beforeEach(() => {
		connection.query('TRUNCATE TABLE categories')
	})

    afterAll(() => {
        connection.query('TRUNCATE TABLE categories')
		connection.end()
    })

	it('should create category', async () => {
		const result = await create()
		expect(result.category.name).toBe('category-test')
	})

    it('should update category', async () => {
		await create()
		const updated = await categories.update(1, 'category-test-updated')
		expect(updated.category.name).toBe('category-test-updated')
		expect(updated.affectedRows).toBe(1)
	})

	it('should delete category', async () => {
		await create()
		const deleted = await categories.del(1)
		expect(deleted.message).toBe('Categoria removida com sucesso')
		expect(deleted.affectedRows).toBe(1)
		expect(deleted.id).toBe(1)
	})

	it('should list categories', async () => {
		await create()
		await create()
		const list = await categories.all()

		expect(list.categories.length).toBe(2)
	})
})
