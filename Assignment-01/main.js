// Assignment-01
let q = 0;
let q2 = 0;
// A. Part 1: Coding Questions (7.5 Grade):

console.log('A. Part 1: Coding Questions');

console.log(`\n Question ${++q}: --------------------------------------`);
// 1. Convert the string "123" to a number and add 7. (0.5 Grade)
// • Output Example: 130

const str1 = '123';
console.log(Number(str1) + 7);
// or
console.log(str1 * 1 + 7);

console.log(`\n Question ${++q}: --------------------------------------`);
// 2. Check if the given variable is falsy and return "Invalid" if it is. (0.5 Grade)
// • Input Example: 0
// • Output Example: "Invalid"
const value1 = 0;
if (!value1) {
	console.log('Invalid');
}

console.log(`\n Question ${++q}: --------------------------------------`);
// 3. Use for loop to print all numbers between 1 and 10, skipping even numbers using continue (0.5 Grade)
// • Output Example:1, 3, 5, 7, 9
for (let i = 1; i <= 10; i++) {
	if (i % 2 === 0) continue;
	console.log(i);
}

console.log(`\n Question ${++q}: --------------------------------------`);
// 4. Create an array of numbers and return only the even numbers using filter method. (0.5 Grade)
// • Input Example: [1, 2, 3, 4, 5]
// • Output Example: [2,4]
const array1 = [1, 2, 3, 4, 5];
const even = array1.filter((item) => item % 2 === 0);
console.log(even);

console.log(`\n Question ${++q}: --------------------------------------`);
// 5. Use the spread operator to merge two arrays, then return the merged array. (0.5 Grade)
// • Input Example: [1, 2, 3], [4, 5, 6]
// • Output Example: [1, 2, 3, 4, 5, 6]
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const margArr = [...arr1, ...arr2];
console.log('merged array: ', margArr);

console.log(`\n Question ${++q}: --------------------------------------`);
// 6. Use a switch statement to return the day of the week given a number (1 = Sunday …., 7 = Saturday). (0.5 Grade)
// • Input Example: 2
// • Output Example: “Monday”

const day = 2;

switch (day) {
	case 1:
		console.log('Sunday');
		break;
	case 2:
		console.log('Monday');
		break;
	case 3:
		console.log('Tuesday');
		break;
	case 4:
		console.log('Wednesday');
		break;
	case 5:
		console.log('Thursday');
		break;
	case 6:
		console.log('Friday');
		break;
	case 7:
		console.log('Saturday');
		break;
	default:
		console.log('Invalid Number');
}

// or using array

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

switch (day) {
	case 1:
		console.log(days[day - 1]);
		break;
	case 2:
		console.log(days[day - 1]);
		break;
	case 3:
		console.log(days[day - 1]);
		break;
	case 4:
		console.log(days[day - 1]);
		break;
	case 5:
		console.log(days[day - 1]);
		break;
	case 6:
		console.log(days[day - 1]);
		break;
	case 7:
		console.log(days[day - 1]);
		break;
	default:
		console.log('Invalid Number');
}

console.log(`\n Question ${++q}: --------------------------------------`);
// 7. Create an array of strings and return their lengths using map method (0.5 Grade)
// • Input: ["a", "ab", "abc"]
// • Output Example: [1, 2, 3]
const arr3 = ['a', 'ab', 'abc', 'abcd'];
const lengths = arr3.map((item) => console.log(item.length));

console.log(`\n Question ${++q}: --------------------------------------`);
// 8. Write a function that checks if a number is divisible by 3 and 5. (0.5 Grade)
// • Input Example: 15
// • Output Example: “Divisible by both”
function isDivisible(num) {
	if (num / 5 == 3 && num / 3 == 5) {
		console.log('“Divisible by both”');
	} else {
		console.log('“non Divisible”');
	}
}

isDivisible(15);

console.log(`\n Question ${++q}: --------------------------------------`);
// 9. Write a function using arrow syntax to return the square of a number (0.5 Grade)
// • Input Example: 5
// • Output Example: 25
const square = (num) => num * num;
console.log(square(5));

console.log(`\n Question ${++q}: --------------------------------------`);
// 10.Write a function that destructures an object to extract values and returns a formatted string. (0.5 Grade)
// • Input Example: const person = {name: 'John', age: 25}
// • Output Example: 'John is 25 years old'
const person = { name: 'John', age: 25 };

const destToString = ({ name, age }) => `${name} is ${age} years old`;
// or
const destToStringSafe = ({ name, age } = {}) => (name && age ? `${name} is ${age} years old` : 'Please! enter valid data');
// console.log(destToString());
console.log(destToString(person));
console.log(destToStringSafe(person));

console.log(`\n Question ${++q}: --------------------------------------`);
// 11.Write a function that accepts multiple parameters (two or more) and returns their sum. (0.5 Grade)
// • Input Example: 1, 2, 3, 4, 5
// • Output Example: 15
const sumMulti = (...rest) => rest.reduce((acc, item) => acc + item, 0);

console.log(sumMulti(1, 2, 3, 4, 5));

console.log(`\n Question ${++q}: --------------------------------------`);
// 12. Write a function that returns a promise which resolves after 3 seconds with a 'Success' message. (0.5 Grade)
// • Output Example: “Success”

const promFc = () => {
	const promise1 = new Promise((resolve) => {
		setTimeout(() => {
			resolve('Success');
		}, 3000);
	});
	promise1.then((res) => console.log('Question 12: ', res));
};
promFc();

console.log(`\n Question ${++q}: --------------------------------------`);
// 13. Write a function to find the largest number in an array. (0.5 Grade)
// • Input Example: [1, 3, 7, 2, 4]
// • Output Example: 7
const arr4 = [1, 3, 7, 2, 4];
const max = (arr) => (Array.isArray(arr) ? Math.max(...arr) : 'Invalid Data');
const max2 = (arr) => Math.max(...(Array.isArray(arr) ? arr : [arr]));
console.log(max(arr4));

// or
const largest = (arr) => arr.sort()?.[arr.length - 1];
console.log(largest(arr4));

// or
const largest2 = (arr) => {
	let max = arr[0];
	arr.forEach((item) => {
		item > max && (max = item);
	});
	return max;
};

console.log(largest2(arr4));

console.log(`\n Question ${++q}: --------------------------------------`);
// 14. Write a function that takes an object and returns an array containing only its keys. (0.5 Grade)
// • Input Example: name: "John", age: 30}
// • Output Example: ["name", "age"]

const objKeys = (obj) => {
	return Object.keys(obj);
};

console.log(objKeys({ name: 'John', age: 30 }));

console.log(`\n Question ${++q}: --------------------------------------`);
// 15. Write a function that splits a string into an array of words based on spaces. (0.5 Grade)
// • Input: "The quick brown fox"
// • Output: ["The", "quick", "brown", "fox"]

const splitString = (string) => string?.split(' ');
console.log(splitString('The quick brown fox'));

// B. Part 2: Essay Questions (2.5 Grade):

console.log('\n \n B. Part 2: Essay Questions ***********');
console.log(`\n Question ${++q2}: --------------------------------------`);
// 1. What is the difference between forEach and for...of? When would you use each? (0.5 Grade)
const answer1 = `
	"forEach": is a method of array, it takes a callback function and execute it for each element in the array, it doesn't return anything and we can't break it or use "continue" in it.
	"for...of": is a loop statement that iterates over iterable objects (like arrays, strings, maps, sets, etc), it allows us to use "break" and "continue" in it.
`;
console.log(answer1);

console.log(`\n Question ${++q2}: --------------------------------------`);
// 2. What is hoisting and what is the Temporal Dead Zone (TDZ)? Explain with examples. (0.5 Grade)
const answer2 = `
-- hoisting is move declaration of "variable" to top, and move declaration and initialization of "function" to top of file.

-- while trying access the variable before declaration
      - declared variable with "let" and "const" -> move it to Temporal Dead Zone (TDZ) till initialization
         console.log(x); // return "can't access variable before initialization"
         let x = 10;

      - declared variable with "var" -> don't move to Temporal Dead Zone (TDZ)
         console.log(x); // return "undefined"
         let var = 10;
`;
console.log(answer2);

console.log(`\n Question ${++q2}: --------------------------------------`);
// 3. What are the main differences between == and ===? (0.5 Grade)
const answer3 = `
   "==" : use Type Coercion so we feel like its only compare values;
   "===": strict compare don't use type coercion.
`;
console.log(answer3);

console.log(`\n Question ${++q2}: --------------------------------------`);
// 4. Explain how try-catch works and why it is important in async operations. (0.5 Grade)
const answer4 = `
	try-catch is allow write promise code in a sync way,
	we put the code may throw an error in the "try" block,
	and add "await" before the async code to wait for it to finish,
	when the async code finish if it resolve the "try" block will continue to execute the next line,
	and if an error occurs it will be caught in the "catch" block
	so wc can handel the error instead of crashing the app.

	its important in async operations because we can
		- add "await" before the async code to wait for it to finish, (ensure the code execute in the right order)
		- catch the error and handel it instead of crashing the app.`;

console.log(answer4);

console.log(`\n Question ${++q2}: --------------------------------------`);
// 5. What’s the difference between type conversion and coercion? Provide examples of each. (0.5 Grade)
const answer5 = `
   "type conversion": Explicit , we use a method or constructor to convert type of data to another type
         Number("10") // 10 as a number
         String(true) // "true"

   "type coercion": Implicit, its auto convert type to another while execute an operation
         const x = "10" + 5  // "105" convert 5 to string and concat to one string 
         const x = "10" - 4 // 6 convert string to a number and Calculate them
`;
console.log(answer5);
