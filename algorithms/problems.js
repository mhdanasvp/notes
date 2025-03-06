// // fibonacci
// function fibonacci(n) {
//     let fib = [0,1]
//     if(n==0) return []
//     if(n==1) return fib
//     for (let i = 2; i <= n; i++) {
//         fib.push((fib[i-2])+(fib[i-1]))
//     }
//     return fib
// }
// console.log(fibonacci(7));

// ------------------------------------------------------------

// // // factorial
// function factorial(n) {
//     if(n<=1) return 1
//     let temp = 1
//     for (let i = 2; i <= n; i++) {
//         temp = temp*i
//     }
//     return temp
// }
// console.log(factorial(5));

// ------------------------------------------------------------

// is prime number
// function isPrime(n) {
//     if (n <= 1) return false
//     if (n == 2) return true
//     for (let i = 2; i < n; i++) {
//         if(n%i==0)return false
//     }
//     return true
// }
// function isPrime(n) {
//     if (n <= 1) return false
//     if (n == 2) return true
//     for (let i = 2; i <= Math.sqrt(n); i++) {
//         if(n%i==0)return false
//     }
//     return true
// }
// console.log(isPrime(5));

// ------------------------------------------------------------

// // isPowerOfTwo
// function isPowerOfTwo(n) {
//     if (n == 0) return true
//     while (n>1) {
//         if(n%2!=0)return false
//         n = n/2
//     }
//     return true
// }
// function isPowerOfTwo(n) {
//     if (n <1 ) return false
//     return (n&n-1) ==0
// }
// console.log(isPowerOfTwo(6));
// console.log(isPowerOfTwo(10));

// ------------------------------------------------------------

// //recursive fibinacci
// function recursive(n){
//     if(n<2) return n
//     return recursive(n-1)+recursive(n-2)
// }
// console.log(recursive(6))

// ------------------------------------------------------------

//recursive factorial
// function factorial(n){
//     if(n<2) return n
//     return factorial(n-1)*n
// }
// console.log(factorial(5))

// ------------------------------------------------------------

// linear search
// function linearSearch(array,target){
//     for (let i = 0; i < array.length; i++) {
//         if(array[i]==target){
//             return i
//         }
//     }
//     return -1
// }
// console.log(linearSearch([1,2,3,4,5,6],5));

// ------------------------------------------------------------

// // binary search
// function binarySearch(array,target){
//     let leftIndex = 0
//     let rightIndex = array.length-1
//     while (leftIndex<=rightIndex) {
//         let middleIndex = Math.floor((leftIndex+rightIndex)/2)
//         console.log(middleIndex);

//         if(target == array[middleIndex]){
//             return middleIndex
//         }else if(target<array[middleIndex]){
//             rightIndex=middleIndex-1
//         }else {
//             leftIndex = middleIndex+1
//         }
//     }
//     return -1
// }
// console.log(binarySearch([1,2,3,4,5,6],5));

// ------------------------------------------------------------

// function recursiveBinarySearch(array, target) {
//     return search(array, target, 0, array.length - 1)
//     function search(arr, tar, leftIndex, rightIndex) {
//         if (leftIndex > rightIndex) {
//             return -1
//         }
//         let middleIndex = Math.floor((leftIndex + rightIndex) / 2)
//         if (target === array[middleIndex]) {
//             return middleIndex
//         }
//         if (target < array[middleIndex]) {
//             return search(arr, tar, leftIndex, middleIndex - 1)
//         } else {
//             return search(arr, tar, middleIndex + 1,rightIndex)
//         }
//     }
// }

// console.log(recursiveBinarySearch([1,2,3,4,5,6],5));

// ------------------------------------------------------------

// bubbleSort
// function bubbleSort(arr){
//     do {
//         var swaped=false
//         for (let i = 0; i < arr.length-1; i++) {
//             let temp=arr[i]
//             if(arr[i]>arr[i+1]){
//                 arr[i]=arr[i+1]
//                 arr[i+1]= temp
//                 swaped=true
//             } 
//         }
//     } while (swaped);
//     return arr
// }
// console.log(bubbleSort([9,8,7,6,5,4,3,2,1]));

// ------------------------------------------------------------

// insertionSort
// function insertionSort(arr){
//     for (let i = 1; i < arr.length; i++) {
//         let nmbr=arr[i]
//         let j=i-1
//         while(j>=0&&arr[j]>nmbr){
//             arr[j+1]=arr[j]
//             j--
//         }
//         arr[j+1] = nmbr

//     }
//     return arr
// }
// console.log(insertionSort([5,4,3,2,1]));

// ------------------------------------------------------------

// Quick sort

// function quickSort(arr){
//     if(arr.length<2) return arr
//     const pivot= arr[arr.length-1]
//     let left = []
//     let right = []
//     for (let i = 0; i < arr.length-1; i++) {
//         if(arr[i]<=pivot){
//             left.push(arr[i])
//         }else{
//             right.push(arr[i])
//         }
//     }
//     return [...quickSort(left),pivot,...quickSort(right)]
// }
// console.log(quickSort([1,2,3,4,5,6]));

// ------------------------------------------------------------

// mergeSort
// function mergeSort(arr){
//     if(arr.length<2) return arr
//     const mid=Math.floor(arr.length/2)
//     const leftArr=arr.slice(0,mid)
//     const rightArr=arr.slice(mid)
//     return merge(mergeSort(leftArr),mergeSort(rightArr))

// }
// function merge(leftArr,rightArr){
//     const sortedArr=[]
//     while (leftArr.length&&rightArr.length) {
//         if(leftArr[0]<=rightArr[0]){
//             sortedArr.push(leftArr.shift())
//         }else{
//             sortedArr.push(rightArr.shift())
//         }
//     }
//     return [...sortedArr,...leftArr,...rightArr]

// }
// console.log(mergeSort([5,4,3,2,1]));


// ------------------------------------------------------------

// function cartesianProduct (a,b){
//     if(!a.length) return b
//     else if(!b.length) return a
//     const result =[]
//     for (let i = 0; i < a.length; i++) {
//         for (let j = 0; j < b.length; j++) {
//             result.push([a[i],b[j]])
//         }
//     }
//     return result
// }
// console.log(cartesianProduct([1,2,3],[4,5,6]));


// ------------------------------------------------------------


