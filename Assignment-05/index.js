// Assignment5
import express from 'express';
import { connectDB, createDB } from './helper-functions.js';

const PORT = 3000;
const app = express();
app.use(
	express.json({
		// limit: '10mb',
		// inflate: true,
		// reviver: null,
		// strict: true,
		// type: 'application/json',
		// verify: undefined,
	}),
);

// Part 1: ERD Diagram (1 Grade)

// <-- ERD diagram image attached with assignment - 4

// Part2: Design a schema (Mapping) for the following ERD. (Use any design tool you want)
// (1 Grade)

//! 👈🏻👈🏻👈🏻👈🏻 <-- Assignment-5-mapping.png
// or 🔗🔗🔗🔗 https://drive.google.com/file/d/1ZwdarqWoDuD3fof44zaZW1O7L4xO_aan/view?usp=sharing

//! 👈🏻👈🏻👈🏻👈🏻 <-- postman collection
// https://documenter.getpostman.com/view/49016393/2sBXqMGyhr

const dbName = 'assignment_5_retail_store_mustafa_ahmed';

// Part 3: (Using Node.js and MySQL) Answer the Questions below based on the given Scenario
// The small retail store needs a database to manage information about its products, suppliers, and sales.
// Database Requirements

const connection = await connectDB();
// create database if not exists
await createDB(connection, dbName).then(() => {
	app.listen(PORT, () => {
		console.log(`🚀 Server is running on port ${PORT} and DB is ready!`);
	});
});

// 1. Products Table:
// o ProductID: Unique identifier for each product (integer, primary key, auto-increment).
// o ProductName: Name of the product (text).
// o Price: Price of the product (decimal).
// o StockQuantity: Quantity of the product in stock (integer).
// o SupplierID: ID of the supplier providing the product (integer, foreign key referencing Suppliers).

// 2. Suppliers Table:
// o SupplierID: Unique identifier for each product (integer, primary key, auto-increment).
// o SupplierName: Name of the supplier (text).
// o ContactNumber: Supplier’s contact number (text).

// 3. Sales Table:
// o SaleID: Unique identifier for each product (integer, primary key, auto-increment).
// o ProductID: Reference to the product sold (integer, foreign key referencing Products).
// o QuantitySold: Quantity of the product sold (integer).
// o SaleDate: Date of sale (date).

// (Using Node.js and MySQL) generate queries that perform the following tasks (8 Grades):
// 1- Create the required tables for the retail store database based on the tables structure and relationships. (0.5 Grade)
app.post('/create-tables', async (req, res) => {
	try {
		// create Suppliers tables
		const querySuppliers = `
			CREATE TABLE IF NOT EXISTS Suppliers (
				id INT PRIMARY KEY AUTO_INCREMENT,
				name VARCHAR(100) NOT NULL,
				contact_no INT
			);
		`;

		await connection.execute(querySuppliers).catch((error) => {
			return res.status(500).json({ success: false, message: 'Failed to create Suppliers table', error });
		});

		// create products table
		const queryProducts = `
			CREATE TABLE IF NOT EXISTS Products (
				id INT PRIMARY KEY AUTO_INCREMENT,
				name varchar(200) NOT NULL,
				price decimal(10, 2) NOT NULL,
				quantity INT,
				supplier_id INT,
				FOREIGN KEY(supplier_id) REFERENCES Suppliers(id) ON DELETE CASCADE ON UPDATE CASCADE
			);`;

		await connection.execute(queryProducts).catch((error) => {
			return res.status(500).json({ success: false, message: 'Failed to create products table', error });
		});

		// create sales table
		const querySales = `
			CREATE TABLE IF NOT EXISTS Sales (
				id INT PRIMARY KEY AUTO_INCREMENT,
				quantity INT,
				sale_date DATE,
				product_id INT,
				FOREIGN KEY(product_id) REFERENCES Products(id) ON DELETE CASCADE ON UPDATE CASCADE
			)`;

		await connection.execute(querySales).catch((error) => {
			return res.status(500).json({ success: false, message: 'Failed to create sales table', error });
		});

		return res.status(201).json({ success: true, message: '✔ Tables created successfully' });
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message || 'Failed to create tables' });
	}
});

// 2- Add a column “Category” to the Products table. (0.5 Grade)
app.post('/add-category-column', async (req, res) => {
	try {
		const query = `
			ALTER TABLE products
				ADD COLUMN category VARCHAR(100)
		`;
		await connection.execute(query);

		return res.status(200).json({ success: true, message: 'Category column added successfully' });
	} catch (error) {
		console.error('❌ Error adding Category column:', error);
		return res.status(500).json({ success: false, message: 'Failed to add Category column' });
	}
});

// 3- Remove the “Category” column from Products. (0.5 Grade)
app.post('/remove-category-column', async (req, res) => {
	try {
		const query = `
			ALTER TABLE products 
				DROP COLUMN category
		`;
		await connection.execute(query);

		return res.status(200).json({ success: true, message: 'Category column removed successfully' });
	} catch (error) {
		console.error('❌ Error removing Category column:', error);
		return res.status(500).json({ success: false, message: 'Failed to remove Category column' });
	}
});

// 4- Change “ContactNumber” column in Suppliers to VARCHAR (15). (0.5 Grade)
app.post('/contact-number-column', async (req, res) => {
	try {
		const query = `
			ALTER TABLE suppliers
				MODIFY contact_no VARCHAR(15)
		`;
		await connection.execute(query);

		return res.status(200).json({ success: true, message: 'Contact number column modified successfully' });
	} catch (error) {
		console.error('❌ Error modifying Contact number column:', error);
		return res.status(500).json({ success: false, message: 'Failed to modify Contact number column' });
	}
});

// 5- Add a NOT NULL constraint to ProductName. (0.5 Grade)
app.post('/product-name-column', async (req, res) => {
	try {
		const query = `
			ALTER TABLE products
			MODIFY name VARCHAR(255) NOT NULL
		`;
		await connection.execute(query);

		return res.status(200).json({ success: true, message: 'Contact number column modified successfully' });
	} catch (error) {
		console.error('❌ Error modifying Contact number column:', error);
		return res.status(500).json({ success: false, message: 'Failed to modify Contact number column' });
	}
});

// 6- Perform Basic Inserts: (0.5 Grade)

// a. Add a supplier with the name 'FreshFoods' and contact number '01001234567'.
app.post('/add-supplier', async (req, res) => {
	try {
		const { name, contact_no } = req.body;
		const query = `
			INSERT INTO suppliers (name, contact_no) 
				VALUES (?, ?)
		`;
		const [addSupplier] = await connection.execute(query, [name, contact_no]);

		return res
			.status(201)
			.json({ success: true, message: `✔ Supplier added successfully with ID: ${addSupplier?.insertId}` });
	} catch (error) {
		console.error('❌ Error adding Supplier:', error);
		return res.status(500).json({ success: false, message: 'Failed to add Supplier' });
	}
});

// b. Insert the following three products, all provided by 'FreshFoods':
// i. 'Milk' with a price of 15.00 and stock quantity of 50.
// ii. 'Bread' with a price of 10.00 and stock quantity of 30.
// iii. 'Eggs' with a price of 20.00 and stock quantity of 40.
app.post('/add-product', async (req, res) => {
	const { name, price, quantity, supplier_name } = req.body;
	try {
		const [suppliers] = await connection.execute(`SELECT id FROM suppliers WHERE name = ?`, [supplier_name]);
		if (suppliers.length === 0) {
			return res.status(500).json({ success: false, message: 'Supplier not found.', error });
		}

		const supplierId = suppliers[0].id;

		const query = `
			INSERT INTO products (name, price, quantity, supplier_id)
			VALUES
				(?, ?, ?, ?)
		`;

		const [addProduct] = await connection.execute(query, [name, price, quantity, supplierId]);

		return res
			.status(201)
			.json({ success: true, message: `✔ Product added successfully with ID: ${addProduct?.insertId}` });
	} catch (error) {
		console.error('❌ Error adding Product:', error);
		return res.status(500).json({ success: false, message: 'Failed to add Product' });
	}
});

// c. Add a record for the sale of 2 units of 'Milk' made on '2025-05-20'.
app.post('/add-sale', async (req, res) => {
	const { product_name, quantity, sale_date } = req.body;
	try {
		const [products] = await connection.execute(`SELECT id FROM products WHERE name = ?`, [product_name]);
		if (products.length === 0) {
			return res.status(500).json({ success: false, message: 'Products not found.', error });
		}

		const productId = products[0]?.id;

		const query = `
			INSERT INTO sales (quantity, product_id, sale_date)
				VALUES
					( ?, ?, ? )
			`;
		const [addSale] = await connection.execute(query, [quantity, productId, sale_date]);

		return res.status(201).json({ success: true, message: `✔ Sale added successfully with ID: ${addSale?.insertId}` });
	} catch (error) {
		console.error('❌ Error Updating Product:', error);
		return res.status(500).json({ success: false, message: 'Failed to add Sale' }, error);
	}
});

// 7- Update the price of 'Bread' to 25.00. (0.5 Grade)
app.patch('/update-product-price', async (req, res) => {
	const { product_name, price } = req.body;
	try {
		const [isExists] = await connection.execute(`SELECT * FROM products WHERE name = ?`, [product_name]);

		if (!isExists?.length) {
			return res.status(404).json({ success: false, message: 'Product not found' });
		}

		const query = `UPDATE products SET price = ? WHERE id = ?`;
		const [updateProduct] = await connection.execute(query, [price, isExists[0]?.id]);

		return res.status(200).json({ success: true, message: `✔ Price of "${product_name}" updated successfully` });
	} catch (error) {
		console.error('❌ Error Updating Product:', error);
		return res.status(500).json({ success: false, message: 'Failed to Update Product', error });
	}
});

// 8- Delete the product 'Eggs'. (0.5 Grade)
app.delete('/delete-product', async (req, res) => {
	const { product_name } = req.body;
	try {
		const [isExists] = await connection.execute(`SELECT * FROM products WHERE name = ?`, [product_name]);

		if (!isExists?.length) {
			return res.status(404).json({ success: false, message: 'Product not found', error });
		}

		const query = `DELETE from products WHERE id = ?`;

		const [updateProduct] = await connection.execute(query, [isExists[0]?.id]);

		return res.status(200).json({ success: true, message: `✔ Product ${product_name} deleted successfully` });
	} catch (error) {
		console.error('❌ Error Deleting Product:', error);
		return res.status(500).json({ success: false, message: 'Failed to Delete Product' });
	}
});

// 9- Retrieve the total quantity sold for each product. (0.5 Grade)
app.get('/total-quantity-sold', async (req, res) => {
	try {
		const query = `
		select 
			p.name AS product_name, 
			p.price ,
			p.quantity AS available_quantity,
			SUM(s.quantity) AS total_quantity_sold
		From Products p

		JOIN sales s ON p.id = s.product_id
		GROUP BY p.name`;

		const [retrieve] = await connection.execute(query);

		return res.status(200).json({ success: true, message: `✔ The total quantity sold for each product`, data: retrieve });
	} catch (error) {
		console.error('❌ Error getting total quantity sold:', error);
		return res.status(500).json({ success: false, message: 'Failed to get total quantity sold' });
	}
});

// 10-Get the product with the highest stock. (0.5 Grade)
app.get('/highest-product-stock', async (req, res) => {
	try {
		const query1 = `
		SELECT * FROM products
			WHERE quantity = (SELECT MAX(quantity) FROM Products)`;

		// Or you can use this query to get the same result
		const query2 = `SELECT * FROM products ORDER BY quantity DESC LIMIT 1`;

		const [data] = await connection.execute(query2);

		return res.status(200).json({ success: true, message: `✔ Highest product stock`, data });
	} catch (error) {
		console.error('❌ Error getting Highest product stock:', error);
		return res.status(500).json({ success: false, message: 'Failed to get Highest product stock' });
	}
});

// 11-Find suppliers with names starting with 'F'. (0.5 Grade)
app.get('/get-suppliers-by-name', async (req, res) => {
	const { name } = req.query;
	try {
		const query = `SELECT * FROM suppliers WHERE name LIKE ?`;

		const [data] = await connection.execute(query, [`${name}%`]);

		return res.status(200).json({ success: true, message: `✔ Suppliers starting with "${name}"`, data });
	} catch (error) {
		console.error('❌ Error getting Suppliers:', error);
		return res.status(500).json({ success: false, message: 'Failed to get Suppliers' });
	}
});

// 12-Show all products that have never been sold. (0.5 Grade)
app.get('/products-not-sold', async (req, res) => {
	try {
		const query = `
			SELECT * FROM products
			LEFT JOIN sales ON products.id = sales.product_id
			WHERE sales.product_id IS NULL
			GROUP BY products.name
		`;

		const [data] = await connection.execute(query);

		return res.status(200).json({ success: true, message: `✔ Products that have never been sold`, data });
	} catch (error) {
		console.error('❌ Error getting Products that have never been sold:', error);
		return res.status(500).json({ success: false, message: 'Failed to get Products that have never been sold' });
	}
});

// 13-Get all sales along with product name and sale date. (0.5 Grade)
app.get('/products-sales', async (req, res) => {
	try {
		const query = `
		SELECT
			products.name,
			products.price,
			products.quantity,
			sales.sale_date,
			sales.quantity
		FROM sales
		LEFT JOIN products ON products.id = sales.product_id
		`;

		const [data] = await connection.execute(query);

		return res.status(200).json({ success: true, message: `✔ Sales with product information`, data });
	} catch (error) {
		console.error('❌ Error getting sales:', error);
		return res.status(500).json({ success: false, message: 'Failed to get sales' });
	}
});

// 14-Create a user “store_manager” and give them SELECT, INSERT, and UPDATE permissions on all tables. (0.5 Grade)
app.post('/add-user-manager', async (req, res) => {
	const { user_name, password } = req.body;
	try {
		const query = `CREATE USER IF NOT EXISTS '${user_name}'@'localhost' IDENTIFIED BY '${password}'`;
		await connection.execute(query).catch((error) => {
			console.error('❌ User not created.', error);
			return res.status(500).json({ success: false, message: 'User not created.', error });
		});

		const grantQuery = `GRANT SELECT, INSERT, UPDATE ON ${dbName}.* TO '${user_name}'@'localhost'`;
		await connection.execute(grantQuery);

		return res.status(201).json({
			success: true,
			message: `✔ Permissions (SELECT, INSERT, UPDATE) granted to ${user_name} successfully`,
		});
	} catch (error) {
		console.error('❌ Error managing permissions:', error);
		return res.status(500).json({ success: false, message: 'Failed to manage permissions', error });
	}
});

// 15-Revoke UPDATE permission from “store_manager”. (0.5 Grade)
app.patch('/revoke-user-manager', async (req, res) => {
	const { user_name } = req.body;
	try {
		await connection.execute(
			`REVOKE
				UPDATE
			ON ${dbName}.* 
			FROM '${user_name}'@'localhost'`,
		);
		return res.status(200).json({ success: true, message: `✔ UPDATE permission revoked from ${user_name} successfully` });
	} catch (error) {
		console.error('❌ Error managing permissions:', error);
		return res.status(500).json({ success: false, message: 'Failed to manage permissions', error });
	}
});

// 16-Grant DELETE permission to “store_manager” only on the Sales table. (0.5 Grade)
app.post('/delete-user-manager', async (req, res) => {
	const { user_name } = req.body;
	try {
		await connection.execute(
			`GRANT
				DELETE
			ON ${dbName}.Sales
			TO '${user_name}'@'localhost'`,
		);
		return res.status(200).json({
			success: true,
			message: `✔ DELETE permission granted to ${user_name} on the Sales table successfully`,
		});
	} catch (error) {
		console.error('❌ Error managing permissions:', error);
		return res.status(500).json({ success: false, message: 'Failed to manage permissions', error });
	}
});

// Bonus (2 Grades)
// How to deliver the bonus?
// 1- Solve the problem Customer Who Visited but Did Not Make Any Transactions on LeetCode
// 2- Inside your assignment folder, create a SEPARATE FILE and name it “bonus.txt”
// 3- Copy the code that you have submitted on the website inside ”bonus.txt” file
