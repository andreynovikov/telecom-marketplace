import postgres from 'postgres'

let sql

if (process.env.NODE_ENV === 'production') {
    sql = postgres()
} else {
    if (!global.__postgresSqlClient) {
        global.__postgresSqlClient = postgres()
    }
    sql = global.__postgresSqlClient
}

export default sql

// helpers (https://github.com/porsager/postgres/discussions/529)
export const and = arr => arr.reduce((acc, x) => sql`${acc} AND ${x}`)
export const or = arr => arr.reduce((acc, x) => sql`(${acc} OR ${x})`)
export const comma = arr => arr.reduce((acc, x) => sql`${acc}, ${x}`)
