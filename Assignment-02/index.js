import fs, { promises as fsPromises } from 'fs';
import path from 'path';

import EventEmitter from 'events';

// Assignment-02
let q = 0;

// 1. Write a function that logs the current file path and directory. (0.5 Grade)
// • Output Example:{File:“/home/user/project/index.js”, Dir:“/home/user/project”}
console.log(`\n Question ${++q}: --------------------------------------`);
const logFileInfo = () => {
	const __filename = fileURLToPath(import.meta.url);
	const data = {
		File: __filename,
		Dir: path.dirname(__filename),
	};
	console.log(data);
};

logFileInfo();

// 2. Write a function that takes a file path and returns its file name. (0.5 Grade)
// • Input Example: /user/files/report.pdf
// • Output Example:"report.pdf"
console.log(`\n Question ${++q}: --------------------------------------`);

const getFileName = (filePath) => {
	console.log('File name:', path.basename(filePath));
};

getFileName('/user/files/report.pdf');

// 3. Write a function that builds a path from an object (0.5 Grade)
// • Input Example: { dir: "/folder", name: "app", ext: ".js"}
// • Output Example: “/folder/app.js”
console.log(`\n Question ${++q}: --------------------------------------`);

const buildPath = ({ dir, name, ext }) => path.join(dir, name + ext);

console.log('Built path:', buildPath({ dir: '/folder', name: 'app', ext: '.js' }));

// 4. Write a function that returns the file extension from a given file path. (0.5 Grade)
// • Input Example: /docs/readme.md"
// • Output Example: “.md”
console.log(`\n Question ${++q}: --------------------------------------`);

const getFileExtension = (filePath) => path.extname(filePath);

console.log('File extension:', getFileExtension('/docs/readme.md'));

// 5. Write a function that parses a given path and returns its name and ext. (0.5 Grade)
// • Input Example: /home/app/main.js
// • Output Example: { Name: “main”, Ext: “.js” }
console.log(`\n Question ${++q}: --------------------------------------`);

const parsePath = (filePath) => {
	const { name, ext } = path.parse(filePath);
	return { Name: name, Ext: ext };
};

console.log('Parsed path: ', parsePath('/home/app/main.js'));

// 6. Write a function that checks whether a given path is absolute. (0.5 Grade)
// • Input Example: /home/user/file.txt
// • Output Example: true
console.log(`\n Question ${++q}: --------------------------------------`);

const checkPath = (filePath) => path.isAbsolute(filePath);

console.log('path is absolute?:', checkPath('/home/user/file.txt'));

// 7. Write a function that joins multiple segments (0.5 Grade)
// • Input:"src","components", "App.js"
// • Output Example: src/components/App.js
console.log(`\n Question ${++q}: --------------------------------------`);

const joinSegments = (...segments) => path.join(...segments);

console.log('joined path: ', joinSegments('src', 'components', 'App.js'));

// 8. Write a function that resolves a relative path to an absolute one. (0.5 Grade)
// • Input Example: ./index.js
// • Output Example: /home/user/project/src/index.js
console.log(`\n Question ${++q}: --------------------------------------`);

const absolutePath = (relativePath) => path.resolve(relativePath);

console.log('absolute path: ', absolutePath('./index.js'));

// 9. Write a function that joins two paths. (0.5 Grade)
// • Input Example: /folder1, folder2/file.txt
// • Output Example: /folder1/folder2/file.txt
console.log(`\n Question ${++q}: --------------------------------------`);

const joinPaths = (firstPath, secondPath) => path.join(firstPath, secondPath);

console.log('Joined paths: ', joinPaths('/folder1', 'folder2/file.txt'));

// 10. Write a function that deletes a file asynchronously. (0.5 Grade)
// • Input Example: /path/to/file.txt
// • Output Example: The file.txt is deleted.
++q;
async function deleteFile(filePath) {
	try {
		await fsPromises.unlink(filePath);
		console.log(`\n Question 10: --------------------------------------`);
		console.log(`The file ${filePath} is deleted.`);
	} catch (error) {
		console.log(`\n Question 10: --------------------------------------`);
		console.error(`Error deleting file: ${error.message}`);
	}
}

deleteFile('/path/to/file.txt');

// 11. Write a function that creates a folder synchronously. (1 Grade)
// • Output Example: “Success”
console.log(`\n Question ${++q}: --------------------------------------`);

function createDirSync(dirName) {
	try {
		fs.mkdirSync(dirName, { recursive: true });
		console.log('Success');
	} catch (error) {
		console.error(`Error creating directory: ${error.message}`);
	}
}

createDirSync('folder-01');

// 12. Create an event emitter that listens for a "start" event and logs a welcome message. (0.5 Grade)
// • Output Example: Welcome event triggered!
console.log(`\n Question ${++q}: --------------------------------------`);

const myEmitter = new EventEmitter();

myEmitter.on('start', () => {
	console.log('Welcome event triggered!');
});

myEmitter.emit('start');

// 13. Emit a custom "login" event with a username parameter. (0.5 Grade)
// • Input Example:"Ahmed"
// • Output Example: “User logged in: Ahmed”
console.log(`\n Question ${++q}: --------------------------------------`);

const emitter = new EventEmitter();

emitter.on('login', (username) => console.log(`“User logged in: ${username}”`));

emitter.emit('login', 'Ahmed');

// 14. Read a file synchronously and log its contents. (1 Grade)
// • Input Example:"./notes.txt"
// • Output Example: the file content => “This is a note.”
console.log(`\n Question ${++q}: --------------------------------------`);

const readFileSync = (filePath, encoding = 'utf-8') => {
	try {
		fs.writeFileSync(filePath, 'This is a note.');
		const data = fs.readFileSync(filePath, '');
		console.log(`the file content => “${data}”`);
	} catch (error) {
		console.error(`Error read file: ${error.message}`);
	}
};

readFileSync('./notes.txt');

// 15. Write asynchronously to a file. (1 Grade)
// • Input: path:"./async.txt", content:"Async save"
// console.log(`\n Question ${++q}: --------------------------------------`);

const writeToFile = async ({ path, content }) => {
	try {
		await fsPromises.writeFile(path, content);
		console.log(`\n Question 15: --------------------------------------`);
		console.log('"Async save" successfully');
	} catch (error) {
		console.log(`\n Question 15: --------------------------------------`);

		console.log('error while write', error.message);
	}
};

writeToFile({ path: './async.txt', content: 'Async save' });

// 16. Check if a directory exists. (0.5 Grade)
// • Input Example: "./notes.txt"
// • Output Example: true
q++;
console.log(`\n Question ${++q}: --------------------------------------`);

const checkDir = async (path) => {
	console.log(fs.existsSync(path));
};

checkDir('./notes.txt');

// 17. Write a function that returns the OS platform and CPU architecture. (0.5 Grade)
// • Output Example: {Platform: “win32”, Arch: “x64”}
console.log(`\n Question ${++q}: --------------------------------------`);

import { arch, platform } from 'os';
import { fileURLToPath } from 'url';

const osInfo = () => console.log({ platform: platform(), Arch: arch() });

osInfo();
