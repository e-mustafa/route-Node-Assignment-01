/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
const removeElement = function (nums, val) {
	let k = 0;

	for (let i = 0; i < nums.length; i++) {
		if (nums[i] !== val) {
			nums[k++] = nums[i];
		}
	}
	console.log('nums', nums);
	console.log('k', k);

	return k;
};

removeElement([3, 2, 2, 3], 3);
removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2);
