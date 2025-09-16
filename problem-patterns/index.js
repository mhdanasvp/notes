// // Two-sum
// function twoSum(arr,target){
//     const map = new Map()
//     for (const element of arr) {
//         const value = target - element
//         if(map.has(value)){
//             return [value,element]
//         }
//         map.set(element,element)
//     }
// }
// console.log(twoSum([6,3,2,5,6,4,2],9));
// Time: O(n)
// Space: O(n)
// -----------------------------------------
//  // Happy number
// function happyNumber(num){
//     const seen = new Set()
//     while (num!==1){
//         if(seen.has(num)) return false
//         seen.add(num)
//         let sum =0
//         while(num>0){
//             let digit = num%10
//             sum+=digit*digit
//             num=Math.floor(num/10)
//         }
//         num=sum 
//     }
//     return true
// }
// console.log(happyNumber(192));
// Time: O(log n) ->It depends on how quickly cycles are detected, but each unique number is processed once → O(log n) per iteration since we're breaking digits
// Space: O(k) k->is the number of unique sums encountered
// ----------------------------------------------------------
// Group Anagrams




