/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
const findKthPositive = (arr, k) => {
	let start = 0;
	let end = arr.length - 1;

	while (start <= end) {
		let mid = Math.floor((start + end) / 2);

		let missingCount = arr[mid] - (mid + 1);

		if (missingCount < k) {
			start = mid + 1;
		} else {
			end = mid - 1;
		}
	}

   console.log('k is: ', start + k);

	return start + k;
};

findKthPositive([2, 3, 4, 7, 11], 5);
findKthPositive([1, 2, 3, 4], 2);
