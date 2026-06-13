/**
 * @param {string[]} strs
 * @return {string}
 */
const longestCommonPrefix = function (strs) {
	if (!strs.length) return '';

	let prefix = strs[0];

	for (let e of strs) {
		while (!e.startsWith(prefix)) {
			prefix = prefix.slice(0, -1);
		}

		if (prefix == '') return '';
	}
	return prefix;
};

console.log(longestCommonPrefix(['flower', 'flow', 'flight']));
console.log(longestCommonPrefix(['dog', 'racecar', 'car']));
