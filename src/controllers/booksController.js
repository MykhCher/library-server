const db = require('../../db');

class BooksController {
    async getBooks(req, res) {
        try {
            const books = await db.query(
                `SELECT b.id, b.title AS title, g.title AS genre, sh.description AS shelf
                FROM books AS b
                JOIN genres AS g
                ON b.genre_id=g.id
                JOIN shelves AS sh
                ON b.shelf_id=sh.id;`
            );
            res.status(200).json(books.rows);
        } catch (err) {
            console.log(err);
        }
    }

    async getBookById(req, res) {
        try {
            const { params: {bookId} } = req;

            const book = await db.query(
                `SELECT b.id, b.title, g.title AS genre, sh.description AS shelf
                FROM books AS b
                JOIN genres AS g
                ON b.genre_id=g.id
                JOIN shelves AS sh
                ON b.shelf_id=sh.id
                WHERE b.id=$1::int;`, [bookId]
            );

            book.rows[0] 
                ? res.status(200).json(...book.rows)
                : res.status(404).json(`book id ${bookId} not found`);
        } catch (err) {
            console.log(err);
        }
    }

    async createBook(req, res) {
        try {
            const {body: {
                title, genre, shelf
            }} = req;
            const newBook = await db.query(
                `INSERT INTO books (title, genre_id, shelf_id)
                VALUES ($1, (
                    SELECT id
                    FROM genres
                    WHERE title=$2
                ), (
                    SELECT id
                    FROM shelves
                    WHERE description=$3
                ))
                RETURNING *;`, [title, genre, shelf]
            );

            res.status(201).json(...newBook.rows);
        } catch (err) {
            console.log(err);
        }
    }

    async deleteBook(req, res) {
        try {
            const { params: {bookId} } = req;

            const deletedBook = await db.query(
                `DELETE FROM books 
                WHERE id=$1
                RETURNING id, title`, [bookId]
            );
        deletedBook.rows[0] 
            ? res.status(200).json(...deletedBook.rows)
            : res.status(404).json(`book id ${bookId} not found`);
        } catch (err) {
            console.log(err);
        }
    }

    async updateBook(req, res) {
        try {
            const {body: {
                id, title, genre, shelf
            }} = req;

            const updatedBook = await db.query(
                `UPDATE books 
                SET 
                    title=$2,
                    genre_id=(
                        SELECT id
                        FROM genres
                        WHERE title=$3
                    ),
                    shelf_id=(
                        SELECT id
                        FROM shelves
                        WHERE description=$4
                    )
                WHERE id=$1
                RETURNING *;`, [id, title, genre, shelf]
            );

            updatedBook.rows[0] 
                ? res.status(200).json(...updatedBook.rows)
                : res.status(404).json(`book id ${id} not found`);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new BooksController()