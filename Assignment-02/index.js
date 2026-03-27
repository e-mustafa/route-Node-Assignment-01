import fs, { promises as fsPromises } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Assignment-02
let q = 0;

// 1. Write a function that logs the current file path and directory. (0.5 Grade)
// • Output Example:{File:“/home/user/project/index.js”, Dir:“/home/user/project”}
console.log(`\n Question ${++q}: --------------------------------------`);

const currentPath = () => {
	const __fileName = fileURLToPath(import.meta.url);

	const data = { File: __fileName, Dir: path.dirname(__fileName) };
	console.log(data);

	return data;
};

currentPath();

// 2. Write a function that takes a file path and returns its file name. (0.5 Grade)
// • Input Example: /user/files/report.pdf
// • Output Example:"report.pdf"
console.log(`\n Question ${++q}: --------------------------------------`);

const getFileName = (filePath) => path.basename(filePath);

console.log('file name is: ', getFileName('/user/files/report.pdf'));

// 3. Write a function that builds a path from an object (0.5 Grade)
// • Input Example: { dir: "/folder", name: "app", ext: ".js"}
// • Output Example: “/folder/app.js”
console.log(`\n Question ${++q}: --------------------------------------`);

const buildPath = (pathObject = {}) => path.format(pathObject);

console.log('your path is: ', buildPath({ dir: '/folder', name: 'app', ext: '.js' }));

// 4. Write a function that returns the file extension from a given file path. (0.5 Grade)
// • Input Example: /docs/readme.md"
// • Output Example: “.md”
console.log(`\n Question ${++q}: --------------------------------------`);

const getFileExt = (filePath) => path.extname(filePath);

console.log('File extension is: ', getFileExt('/docs/readme.md'));

// 5. Write a function that parses a given path and returns its name and ext. (0.5 Grade)
// • Input Example: /home/app/main.js
// • Output Example: { Name: “main”, Ext: “.js” }
console.log(`\n Question ${++q}: --------------------------------------`);

const parsePath = (filepath) => {
	const data = path.parse(filepath);

	return { Name: data.name, Ext: data.ext };
};

console.log('Parsed path is: ', parsePath('/home/app/main.js'));

// 6. Write a function that checks whether a given path is absolute. (0.5 Grade)
// • Input Example: /home/user/file.txt
// • Output Example: true
console.log(`\n Question ${++q}: --------------------------------------`);

const isAbsolutePath = (filePath) => path.isAbsolute(filePath);

console.log('Is path absolute? : ', isAbsolutePath('/home/user/file.txt'));

// 7. Write a function that joins multiple segments (0.5 Grade)
// • Input:"src","components", "App.js"
// • Output Example: src/components/App.js
console.log(`\n Question ${++q}: --------------------------------------`);

const joinSegments = (...segments) => path.join(...segments);

console.log('Joined segments: ', joinSegments('src', 'components', 'App.js'));

// 8. Write a function that resolves a relative path to an absolute one. (0.5 Grade)
// • Input Example: ./index.js
// • Output Example: /home/user/project/src/index.js
console.log(`\n Question ${++q}: --------------------------------------`);

const resolvePath = (filePath) => path.resolve(filePath);

console.log('Absolute path is: ', resolvePath('./index.js'));

// 9. Write a function that joins two paths. (0.5 Grade)
// • Input Example: /folder1, folder2/file.txt
// • Output Example: /folder1/folder2/file.txt
console.log(`\n Question ${++q}: --------------------------------------`);

const joinPaths = (...paths) => path.join(...paths);

console.log('Joined paths: ', joinPaths('/folder1', 'folder2/file.txt'));

// 10. Write a function that deletes a file asynchronously. (0.5 Grade)
// • Input Example: /path/to/file.txt
// • Output Example: The file.txt is deleted.
++q;

const deleteFile = (filePath) => {
	fs.unlink(filePath, (err) => {
		console.log(`\n Question ${10}: --------------------------------------`);

		if (err) return console.error(err.message);

		console.log(`The ${path.basename(filePath)} is deleted.`);
	});
};

const deleteFilePromise = async (dir) => {
	try {
		await fsPromises.unlink(dir);
		console.log(`\n Question ${10}: --------------------------------------`);

		console.log(`The ${path.basename(dir)} is deleted.`);
	} catch (error) {
		console.log(`\n Question ${10}: --------------------------------------`);
		console.log('Failed delete File: ', error.message);
	}
};
deleteFile('./Assignment-02/path/to/file.txt');
await deleteFilePromise('./Assignment-02/path/to/file2.txt');

// 11. Write a function that creates a folder synchronously. (1 Grade)
// • Output Example: “Success”
console.log(`\n Question ${++q}: --------------------------------------`);

const createFolder = (dir) => {
	try {
		fs.mkdirSync(dir, { recursive: true });
		console.log('success');
	} catch (error) {
		console.log('Failed create folder: ', error.message);
	}
};

createFolder('./Assignment-02/new-folder');

// 12. Create an event emitter that listens for a "start" event and logs a welcome message. (0.5 Grade)
// • Output Example: Welcome event triggered!
console.log(`\n Question ${++q}: --------------------------------------`);

import { EventEmitter } from 'events';
import { arch, platform } from 'os';

const eventEmitter1 = new EventEmitter();

eventEmitter1.on('start', () => {
	console.log('Welcome event triggered!');
});

eventEmitter1.emit('start');

// 13. Emit a custom "login" event with a username parameter. (0.5 Grade)
// • Input Example:"Ahmed"
// • Output Example: “User logged in: Ahmed”
console.log(`\n Question ${++q}: --------------------------------------`);

eventEmitter1.on('login', (username) => {
	console.log(`“User logged in: ${username}”`);
});

eventEmitter1.emit('login', 'Ahmed');

// 14. Read a file synchronously and log its contents. (1 Grade)
// • Input Example:"./notes.txt"
// • Output Example: the file content => “This is a note.”
console.log(`\n Question ${++q}: --------------------------------------`);

const readFileContent = (filePath) => {
	try {
		const content = fs.readFileSync(filePath, 'utf-8');
		console.log(`the file content => “${content}”`);
	} catch (error) {
		console.log('Failed read file: ', error.message || error);
	}
};
readFileContent('./Assignment-02/notes.txt');

// 15. Write asynchronously to a file. (1 Grade)
// • Input: path:"./async.txt", content:"Async save"

const writeAsync = async ({ path, content }) => {
	console.log(`\n Question ${++q}: --------------------------------------`);
	try {
		await fsPromises.writeFile(path, content);
		console.log('File Created and written successfully');
	} catch (error) {
		console.log('Failed write file: ', error.message || error);
	}
};

await writeAsync({ path: './Assignment-02/async.txt', content: 'Async save' });

// 16. Check if a directory exists. (0.5 Grade)
// • Input Example: "./notes.txt"
// • Output Example: true
console.log(`\n Question ${++q}: --------------------------------------`);

const isDirExist = (dir) => fs.existsSync(dir);
console.log(isDirExist('./Assignment-02/notes.txt'));

// 17. Write a function that returns the OS platform and CPU architecture. (0.5 Grade)
// • Output Example: {Platform: “win32”, Arch: “x64”}
console.log(`\n Question ${++q}: --------------------------------------`);

const osInfo = () => ({ Platform: platform(), Arch: arch() });
console.log(osInfo(), '\n\n\n');
