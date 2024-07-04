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
                WHERE a.id=$1::int`, [authorId]
            );

            author.rows[0] 
                ? res.status(200).json(...author.rows)
                : res.status(404).json(`author id ${authorId} not found`);
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new AuthorController()