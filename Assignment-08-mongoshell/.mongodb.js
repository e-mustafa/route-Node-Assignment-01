//! Assignment 8 - MongoDB Shell

use('assignment8');

// 1. Create an explicit collection named “books” with a validation rule to ensure that each
// document has a non-empty “title” field. (0.5 Grade)
// • URL: POST /collection/books
db.createCollection('books', {
	validator: {
		$jsonSchema: {
			bsonType: 'object',
			required: ['title'],
			properties: {
				title: {
					bsonType: 'string',
					minLength: 2,
					description: 'Title must be a string and at least 2 characters long and is required',
				},
			},
		},
	},
});

// 2. Create an implicit collection by inserting data directly into a new collection named
// “authors”. (0.5 Grade)
// • URL: POST /collection/authors
db.authors.insertOne({
	name: 'Ahmed',
	age: 30,
	nationality: 'Egyptian',
});

// 3. Create a capped collection named “logs” with a size limit of 1MB. (0.5 Grade)
// • URL: POST /collection/logs/capped
db.createCollection('logs', {
	// $size: 1000000,
	// $type: 'capped',

	capped: true,
	size: 1048576, // 1MB = 1024 * 1024 bytes
});

// 4. Create an index on the books collection for the title field. (0.5 Grade)
// • URL: POST /collection/books/index
db.books.createIndex({ title: 1 });

// 5. Insert one document into the books collection. (0.5 Grade)
// • URL: POST /books

db.books.insertOne({
	title: 'Book1',
	author: 'Ahmed',
	year: 1937,
	genres: ['Fantasy', 'Adventure'],
});

// 6. Insert multiple documents into the books collection with at least three records. (0.5 Grade)
// • URL: POST /books/batch
db.books.insertMany([
	{
		title: 'Future',
		year: 2828,
		genres: ['Science Fiction'],
	},
	{
		title: 'To Kill a Mockingbird',
		author: 'Harper Lee',
		year: 1968,
		genres: ['Classic', 'Fiction'],
	},
	{
		title: 'Brave New World',
		author: 'Aldous Huxley',
		year: 2006,
		genres: ['Dystopian', 'Science Fiction'],
	},
]);

// 7. Insert a new log into the logs collection. (0.5 Grade)
// • URL: POST /logs
db.logs.insertOne({
	book_id: ObjectId('6a096be13696d385a0849e98'), // replace
	action: 'borrowed',
	message: 'This is a log message',

	level: 'info',
	timestamp: new Date(),
});

// 8. Update the book with title “Future” change the year to be 2022. (0.5 Grade)
db.books.updateOne({ title: 'Future' }, { $set: { year: 2022 } });

// 2 -----------------------------------------------------------------------

// 9. Find a Book with title “Brave New World”. (0.5 Grade)
// • URL: GET /books/title => /books/title?title=Brave New World
db.books.findOne({ title: 'Brave New World' });

// 10. Find all books published between 1990 and 2010. (0.5 Grade)
// • URL: GET /books/year => /books/year?from=1990&to=2010
db.books.find({ year: { $gte: 1990, $lte: 2010 } });

// 11. Find books where the genre includes "Science Fiction".(0.5 Grade)
// • URL: /books/genre?genre=Science Fiction
db.books.find({ genres: { $in: ['Science Fiction'] } });

// 12. Skip the first two books, limit the results to the next three, sorted by year in descending
// order. (0.5 Grade)
// • URL: GET /books/skip-limit
db.books.find().sort({ year: -1 }).skip(2).limit(3);

// 3 -----------------------------------------------------------------------

// 13. Find books where the year field stored as an integer. (0.5 Grade)
// • URL: GET /books/year-integer
db.books.find({ year: { $type: 'int' } });

// 14. Find all books where the genres field does not include any of the genres "Horror" or
// "Science Fiction". (0.5 Grade)
// • URL: GET /books/exclude-genres
db.books.find({ genres: { $nin: ['Horror', 'Science Fiction'] } });

// 15. Delete all books published before 2000. (0.5 Grade)
// • DELETE: GET /books/before-year?year=2000
db.books.deleteMany({ year: { $lt: 2000 } });

// 16. Using aggregation Functions, Filter books published after 2000 and sort them by year
// descending. (0.5 Grade)
// • URL: GET /books/aggregate1
db.books.aggregate([{ $match: { year: { $gt: 2000 } } }, { $sort: { year: -1 } }]);

// 4 -----------------------------------------------------------------------

// 17. Using aggregation functions, Find all books published after the year 2000. For each
// matching book, show only the title, author, and year fields. (0.5 Grade)
// • URL: GET /books/aggregate2
db.books.aggregate([
	{
		$match: {
			year: { $gt: 2000 },
		},
	},
	{
		$project: {
			_id: 0,
			title: 1,
			author: 1,
			year: 1,
		},
	},
]);

// 18. Using aggregation functions,break an array of genres into separate documents. (0.5 Grade)
// • URL: GET /books/aggregate3
db.books.aggregate([{ $unwind: '$genres' }]);

// 19. Using aggregation functions, Join the books collection with the logs collection. (1 Grade)
// • URL: GET /books/aggregate4
db.books.aggregate([
	{
		$lookup: {
			from: 'logs',
			localField: '_id',
			foreignField: 'book_id',
			as: 'logs',
		},
	},
]);
