// const calculations = function(x,y){
//     return x+y;
// }
// console.log(calculations(2,5));

// const calculations = (x,y) => {
//     if (x > y) {
//         return x + y;
//     } else {
//         return x -y
//     }
// }
// console.log(calculations(1,2));
// function outerFunction(x) {
//     return function innerFunction() {
//         return x++;  
//     };
// }

// const myFunc = outerFunction(10);
// console.log(myFunc()); // Output: 10
// console.log(myFunc());
// console.log(myFunc());
// function expect(val) {
//     return {
//         toBe: function(expected) {
//             if (val === expected) {
//                 return true;
//             }
//             throw new Error("Not Equal");
//         },
//         notToBe: function(expected) {
//             if (val !== expected) {
//                 return true;
//             }
//             throw new Error("Equal");
//         }
//     };
// }
// // Usage examples
// console.log(expect(5).toBe(5));    // Output: true
// console.log(expect(5).notToBe(10)); // Output: true
// try {
//     expect(5).toBe(10); // Throws: "Not Equal"
// } catch (error) {
//     console.log(error.message); 
// }
// try {
//     expect(5).notToBe(5); // Throws: "Equal"
// } catch (error) {
//     console.log(error.message); 
// }
// const arr = [1,-3,-1,0,5,6,8,-4,6]
// arr.sort((a,b)=>a-b)
// console.log(arr);
// let str = "hello world";
// let result = str.split('').reverse().join('');
// console.log(result);

// let string = "hello world";
// let reversed = str.split(" ").reverse().join(" ");
// console.log(reversed); // Output: "world hello"
// function separateAndSort(arr) {
//     let numbers = arr.filter(item => typeof item === 'number').sort((a, b) => a - b);
//     let strings = arr.filter(item => typeof item === 'string');
//     return { numbers, strings };
// }
// // Example Usage
// let mixedArray = [3, "apple", 1, "banana", 5, "orange", 2, "grape"];
// let result = separateAndSort(mixedArray);

// console.log(result.numbers); // Output: [1, 2, 3, 5]
// console.log(result.strings); // Output: ["apple", "banana", "grape", "orange"]
// function findVowels(name) {
//     let vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
//     return name.split('').filter(char => vowels.includes(char)).join('');
// }
// // Example Usage
// let myName = "Ragavendhran";
// let result = findVowels(myName);

// console.log(result); // Output: "aaea"

// const findVowels = name => name.split('').filter(char => "aeiouAEIOU".includes(char)).join('');

// const countVowels = name => findVowels(name).length;

// // Example Usage
// let myName = "Ragavendhran";
// console.log(findVowels(myName)); // Output: "aaea"
// console.log(countVowels(myName)); // Output: 4


// const findVowelsAndCount = name => ({ 
//     vowels: name.match(/[aeiou]/gi)?.join('') || "", 
//     count: name.match(/[aeiou]/gi)?.length || 0 
// });

// // Example Usage
// console.log(findVowelsAndCount("Ragavendhran")); 
// // Output: { vowels: 'aaea', count: 4 }

// let arr = [];
// console.log(!arr); // false





