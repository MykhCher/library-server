const db = require('../../db');

class CustomerController {
    async getCustomers(req, res) {
        try {
            const customers = await db.query(
                'SELECT id, full_name, email, phone FROM customers;'
            );
            res.status(200).json(customers.rows);
        } catch (err) {
            console.log(err);
        }
    }

    async getCustomerById(req, res) {
        try {
            const { params: {customerId} } = req;

            const customer = await db.query(
                `SELECT id, full_name, email, phone
                FROM customers
                WHERE id=$1::int;`, [customerId]
            );

            customer.rows[0] 
                ? res.status(200).json(...customer.rows)
                : res.status(404).json(`customer id ${customerId} not found`);
        } catch (err) {
            console.log(err);
        }
    }

    async createCustomer(req, res) {
        try {
            const {body: {
                full_name, email, phone, password
            }} = req;
            const newCustomer = await db.query(
                `INSERT INTO customers (full_name, email, phone, password)
                VALUES ($1, $2, $3, $4)
                RETURNING *;`, [full_name, email, phone, password]
            );

            res.status(201).json(...newCustomer.rows);
        } catch (err) {
            console.log(err);
        }
    }

    async deleteCustomer(req, res) {
        try {
            const { params: {customerId} } = req;

            const deletedCustomer = await db.query(
                `DELETE FROM customers 
                WHERE id=$1
                RETURNING id, full_name`, [customerId]
            );
        deletedCustomer.rows[0] 
            ? res.status(200).json(...deletedCustomer.rows)
            : res.status(404).json(`customer id ${customerId} not found`);
        } catch (err) {
            console.log(err);
        }
    }

    async updateCustomer(req, res) {
        try {
            const {body: {
                id, full_name, email, phone, password
            }} = req;

            const updatedCustomer = await db.query(
                `UPDATE customers 
                SET 
                    full_name=$2,
                    email=$3,
                    phone=$4,
                    password=$5
                WHERE id=$1
                RETURNING *;`, [id, full_name, email, phone, password]
            );

            updatedCustomer.rows[0] 
                ? res.status(200).json(...updatedCustomer.rows)
                : res.status(404).json(`customer id ${id} not found`);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new CustomerController()