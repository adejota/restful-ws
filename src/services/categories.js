const categories = (deps) => {
    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                
                connection.query('SELECT * FROM categories', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar categorias', reject)
                        return
                    }

                    resolve({
                        categories: results
                    })
                })
            })
        },

        save: (name) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                
                connection.query('INSERT INTO categories (name) VALUES (?)', [name], (error, results) => {
                    if (error) {
                        errorHandler(error, `Falha ao salvar categoria ${name}`, reject)
                        return
                    }

                    resolve({
                        category: { name, id: results.insertId }
                    })
                })
            })
        },

        update: (id, name) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                
                connection.query('UPDATE categories SET name = ? WHERE id = ?', [name, id], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Falha ao atualizar categoria ${name}`, reject)
                        return
                    }

                    resolve({
                        category: { name, id },
                        affectedRows: results.affectedRows
                    })
                })
            })
        },

        del: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                
                connection.query('DELETE FROM categories WHERE id = ?', [id], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Falha ao remover categoria de id ${id}`, reject)
                        return
                    }

                    resolve({
                        message: `Categoria removida com sucesso`,
                        affectedRows: results.affectedRows,
                        id
                    })
                })
            })
        },
    }
}

module.exports = categories
