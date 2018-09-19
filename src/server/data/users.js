export const createQuery = `
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name TEXT, 
            email VARCHAR(255) NOT NULL UNIQUE, 
            password TEXT NOT NULL
        )
    `

export const dropQuery = `DROP TABLE users`