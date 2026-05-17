/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
	const romanMap = {
		I: 1,
		V: 5,
		X: 10,
		L: 50,
		C: 100,
		D: 500,
		M: 1000,
	};
	let total = 0;
	let prevVal = 0;

	// Iterate through the string from right to left <--
	for (let i = s.length - 1; i >= 0; i--) {
		const curVal = romanMap[s[i]];
		if (curVal < prevVal) {
			total -= curVal;
		} else {
			total += curVal;
			prevVal = curVal;
		}
	}

	
	//? Or Alternative approach using reduce:

	// const total = s.split('').reduce((acc, char, i) => {
	// 	const curVal = +romanMap[char];

	// 	curVal < +romanMap[s[i + 1]] ? (acc -= curVal) : (acc += curVal);

	// 	return acc;
	// }, 0);
	console.log('total:', total);
	return total;
};

// Example 1:

// Input: s = "III"
// Output: 3
// Explanation: III = 3.
// Example 2:

// Input: s = "LVIII"
// Output: 58
// Explanation: L = 50, V= 5, III = 3.
// Example 3:

// Input: s = "MCMXCIV"
// Output: 1994
// Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.

romanToInt('III');
romanToInt('LVIII');
romanToInt('MCMXCIV');
