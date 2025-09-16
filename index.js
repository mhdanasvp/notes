
// function repeat(str, longest = "") {
//   let temp = ""
//   let index = 0
//   while (index < str.length) {
//       if (str.at(index) == str.at(index + 1)) {
//           temp = str.slice(0, index + 2)
//           index++
//       } else {
//           str = str.slice(index + 1)
//           longest = longest.length < temp.length ? temp : longest
//           break
//       }
//   }
//   if (str) return repeat(str, longest)
//   else return longest
// }

// function repeat1(str){
//   let right=left=r=l=0;
//   function search(){

//   }
//   if(left=str.length){

//   }

// }
// function test(str) {
//   let rightIndex = 0
//   let longest = ""
//   let temp=""
//   for (let j = rightIndex; j < str.length; j++) {
//       if (str.at(j - 1) && str.at(j) == str.at(j - 1)) {
//           temp += str.at(j)
//       } else {
//           temp = str.at(j)
//       }
//       longest = longest.length < temp.length ? temp : longest
//   }
//   return longest
// }



// let xyz = "aaassdddssswwwswswswwww"
// console.log(repeat(xyz));
// console.log(test(xyz));

