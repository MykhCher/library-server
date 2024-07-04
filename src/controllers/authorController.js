const db = require('../../db');

class AuthorController {
    async getAuthors(req, res) {
        try {
            const authors = await db.query(
                'SELECT * FROM authors;'
            );
            res.status(200).json(authors.rows);
        } catch (err) {
            console.log(err);
        }
    }

    async getAuthorById(req, res) {
        try {
            const { params: {authorId} } = req;

            const author = await db.query(
                `SELECT a.id, full_name, email, nat.description AS nationality
                FROM authors AS a
                JOIN nationalities AS nat
                ON a.nationality_id=nat.id
                WHERE a.id=$1::int;`, [authorId]
            );

            author.rows[0] 
                ? res.status(200).json(...author.rows)
                : res.status(404).json(`author id ${authorId} not found`);
        } catch (err) {
            console.log(err);
        }
    }

    async createAuthor(req, res) {
        try {
            const {body: {
                full_name, email, nationality
            }} = req;
            const newAuthor = await db.query(
                `INSERT INTO authors (full_name, email, nationality_id)
                VALUES ($1, $2, (
                    SELECT id
                    FROM nationalities
                    WHERE title=$3
                ))
                RETURNING *;`, [full_name, email, nationality]
            );

            res.status(201).json(...newAuthor.rows);
        } catch (err) {
            console.log(err);
        }
    }

    async deleteAuthor(req, res) {
        try {
            const { params: {authorId} } = req;

            const deletedAuthor = await db.query(
                `DELETE FROM authors 
                WHERE id=$1
                RETURNING id, full_name`, [authorId]
            );
        deletedAuthor.rows[0] 
            ? res.status(200).json(...deletedAuthor.rows)
            : res.status(404).json(`author id ${authorId} not found`);
        } catch (err) {
            console.log(err);
        }
    }

    async updateAuthor(req, res) {
        try {
            const {body: {
                id, full_name, email, nationality
            }} = req;

            const updatedAuthor = await db.query(
                `UPDATE authors 
                SET 
                    full_name=$2,
                    email=$3,
                    nationality_id=(
                        SELECT id
                        FROM nationalities
                        WHERE title=$4
                    )
                WHERE id=$1
                RETURNING *;`, [id, full_name, email, nationality]
            );

            updatedAuthor.rows[0] 
            ? res.status(200).json(...updatedAuthor.rows)
            : res.status(404).json(`author id ${id} not found`);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new AuthorController()