22.in array [2,a,4,6,r,i,o,10,18]
in this array i need to split alphated and number and i need to sort the number

function separateAndSort(arr) {
    // Initialize empty arrays for letters and numbers
    const letters = [];
    const numbers = [];
    
    // Separate letters and numbers
    for (let item of arr) {
      if (typeof item === 'number') {
        numbers.push(item);
      } else if (typeof item === 'string') {
        letters.push(item);
      }
    }
    
    // Sort the numbers in ascending order
    numbers.sort((a, b) => a - b);
    
    return {
      letters,
      sortedNumbers: numbers
    };
  }
  
  // The given array
  const mixedArray = [2, 'a', 4, 6, 'r', 'i', 'o', 10, 18];
  
  // Get the result
  const result = separateAndSort(mixedArray);
  console.log("Letters:", result.letters);
  console.log("Sorted Numbers:", result.sortedNumbers);
_______________________________________
  26. in this string find the vowles and add dot between each and

  function addDotsBetweenLettersAndFindVowels(str) {
    // Initialize an empty array to store vowels
    const vowels = [];
    const vowelSet = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
    
    // Add a dot between each letter
    let result = '';
    for (let i = 0; i < str.length; i++) {
      // Add the current character
      result += str[i];
      
      // Check if the current character is a vowel
      if (vowelSet.has(str[i])) {
        vowels.push(str[i]);
      }
      
      // Add a dot if this isn't the last character
      if (i < str.length - 1) {
        result += '.';
      }
    }
    
    return {
      dotted: result,
      vowels: vowels
    };
  }
  
  const input = "ragavendhran";
  const result = addDotsBetweenLettersAndFindVowels(input);
  
  console.log("String with dots:", result.dotted);
  console.log("Vowels found:", result.vowels);

  27.Problem 2: Find the Second Largest Number in an Array
  function findSecondLargest(arr) {
    if (!arr || arr.length < 2) return null;
    
    let largest = -Infinity;
    let secondLargest = -Infinity;
    
    for (let num of arr) {
      if (num > largest) {
        secondLargest = largest;
        largest = num;
      } else if (num > secondLargest && num !== largest) {
        secondLargest = num;
      }
    }
    
    return secondLargest === -Infinity ? null : secondLargest;
  }
  
  console.log(findSecondLargest([10, 5, 20, 8, 20])); // 10

  28,Reverse a String

  function reverseString(str) {
    // Method 1: Built-in methods
    return str.split('').reverse().join('');
    
    // Method 2: Using a loop
    // let reversed = '';
    // for (let i = str.length - 1; i >= 0; i--) {
    //   reversed += str[i];
    // }
    // return reversed;
  }
  
  console.log(reverseString("hello")); // "olleh"
_______________________________________


/**
 * Find duplicates in an array without using built-in methods
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function findDuplicates(arr) {
  const duplicates = [];
  const seen = {};
  
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    
    if (seen[current] === undefined) {
      // First time seeing this element
      seen[current] = 1;
    } else if (seen[current] === 1) {
      // Second time seeing this element (duplicate)
      duplicates.push(current);
      seen[current]++; // Mark as already added to duplicates
    }
    // If seen[current] > 1, we've already recorded it as a duplicate
  }
  
  return duplicates;
}

/**
 * Find the largest number in an array without using Math.max
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function findLargest(arr) {
  if (arr.length === 0) return undefined;
  
  let largest = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > largest) {
      largest = arr[i];
    }
  }
  
  return largest;
}

/**
 * Find the second largest number in an array without using sort or Math.max
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function findSecondLargest(arr) {
  if (arr.length < 2) return undefined;
  
  let largest = arr[0];
  let secondLargest = Number.NEGATIVE_INFINITY;
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > largest) {
      secondLargest = largest;
      largest = arr[i];
    } else if (arr[i] < largest && arr[i] > secondLargest) {
      secondLargest = arr[i];
    }
    // Ignore if arr[i] is smaller than secondLargest or equal to largest
  }
  
  return secondLargest === Number.NEGATIVE_INFINITY ? undefined : secondLargest;
}

/**
 * Custom implementation of array filter without using built-in filter
 * Time Complexity: O(n)
 * Space Complexity: O(n) for the filtered array
 */
function customFilter(arr, filterFn) {
  const filtered = [];
  
  for (let i = 0; i < arr.length; i++) {
    if (filterFn(arr[i], i, arr)) {
      filtered.push(arr[i]);
    }
  }
  
  return filtered;
}

// Example usage:
const testArray = [3, 7, 2, 9, 3, 7, 5, 10, 3, 8];

// 1. Find duplicates
const duplicates = findDuplicates(testArray);
console.log("Duplicates:", duplicates); // [3, 7]

// 2. Find largest number
const largest = findLargest(testArray);
console.log("Largest number:", largest); // 10

// 3. Find second largest number
const secondLargest = findSecondLargest(testArray);
console.log("Second largest number:", secondLargest); // 9

// 4. Custom filter (example: filter out numbers less than 5)
const filtered = customFilter(testArray, (num) => num >= 5);
console.log("Numbers >= 5:", filtered); // [7, 9, 7, 5, 10, 8]

// More complex examples:
// Find even numbers
const evenNumbers = customFilter(testArray, (num) => num % 2 === 0);
console.log("Even numbers:", evenNumbers); // [2, 10, 8]

// Find numbers at odd indices
const oddIndices = customFilter(testArray, (_, index) => index % 2 !== 0);
console.log("Elements at odd indices:", oddIndices); // [7, 9, 7, 10, 8]

_______________________________________

reduce()

reduce is the method you can calla s an array ito combine multiple element in to single value 

const words = ['hello', 'world', 'this', 'is', 'reduce'];
 const sentence = words.reduce((acc, word) => acc+ ' ' + word, '');
 console.log(sentence); // "hello world this is reduce"


function sortArrayProblem(arr){
  const sortedArray = arr.sort((a,b) => b-a);
  const modifiedArray = sortedArray.map((value,index) => {
    if (index === 0){
      return value
    } else if(index === 1){
      return value + 1;
    } else if (index === 2){
      return value 
    } else if(index === 3){
      return value + value
    } else {
      return value
    }
  });
  const sum = modifiedArray.reduce((total,current)=> current + total, 0);
  return {
    orignalArrY,
    sum,
    modifiedArray,
    sortedArray
  }
}

19. Given an array - filter the array into single values (remove duplicates using minimum time complexity)

function removeDuplicates(arr) {
    // Using Set for O(n) time complexity
    return [...new Set(arr)];
    // return [...new setInterval(arr)]
  }
  
  // Alternative approach
  function removeDuplicatesAlt(arr) {
    const seen = {};
    return arr.filter(item => {
      // If we haven't seen this item before, mark it and keep it
      if (!seen[item]) {
        seen[item] = true;
        return true;
      }
      return false;
    });
  }
  
  // Example
  const array = [1, 2, 2, 3, 4, 4, 5];
  console.log(removeDuplicates(array)); // [1, 2, 3, 4, 5]

  20. Given an array - keep only duplicate values from array using space complexity
  function keepOnlyDuplicates(arr) {
    const frequency = {};
    const result = [];
    
    // Count occurrences of each element
    for (const item of arr) {
      frequency[item] = (frequency[item] || 0) + 1;
    }
    
    // Filter original array to keep only items that appear more than once
    for (const item of arr) {
      if (frequency[item] > 1 && !result.includes(item)) {
        result.push(item);
      }
    }
    
    return result;
  }
  
  // Example
  const array = [1, 2, 2, 3, 4, 4, 5];
  console.log(keepOnlyDuplicates(array)); // [2, 4]

  21. Given an array - find the 2nd highest number using (-Infinity)

  function findSecondHighest(arr) {
    if (arr.length < 2) return undefined;
    
    let highest = -Infinity;
    let secondHighest = -Infinity;
    
    for (const num of arr) {
      if (num > highest) {
        secondHighest = highest;
        highest = num;
      } else if (num > secondHighest && num < highest) {
        secondHighest = num;
      }
    }
    
    return secondHighest === -Infinity ? undefined : secondHighest;
  }

  _______________________________________

//   removeDuplicate from the array

const numbers = [1,2,3,2,10,8,4,8,4];
const uniqueNumbers = [...new Set(numbers)];
console.log(uniqueNumbers);


// sorting
const array2 = [30, 1, 4, 21, 100000];
array2.sort((a, b) => a - b); // Ascending order
console.log(array2); // Output: [1, 4, 21, 30, 100000]

array2.sort((a, b) => b - a); // Descending order
console.log(array2); // Output: [100000, 30, 21, 4, 1]

//sum of array using reduce

const numberss = [1, 2, 3, 4, 5];
const sum = numberss.reduce((value1,value2)=> {
  return value1 + value2;
},0);

console.log(sum);
if they want to do sum the number in array means first in const declare array and declare const sum = numberss.reduce((value , value2) =>{
  return value1 + value2
})
_______________________________________________________________________
function counter(){
  let count = 0;
  return function(){
    count++;
    return count;
  }
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter());
_______________________________________
// implementing the debounce functionlity

function debounce(func, delay){
  let timeout;
  return function(...args){
    clearTimeout(timeout);
    setTimeout(()=> {
      func.apply(this, args);
    }, delay)
  }

}

const handleSearch = debounce((text) => {
  console.log(text)
})

handleSearch('A');
handleSearch("ab");
handleSearch("ABC");
_______________________________________________________________________

function removeDuplicates(arr) {
    // Using Set for O(n) time complexity
    return [...new Set(arr)];
    // return [...new setInterval(arr)]
  }
 
  // Alternative approach
  function removeDuplicatesAlt(arr) {
    const seen = {};
    return arr.filter(item => {
      // If we haven't seen this item before, mark it and keep it
      if (!seen[item]) {
        seen[item] = true;
        return true;
      }
      return false;
    });
  }
 
  // Example
  const array = [1, 2, 2, 3, 4, 4, 5];
  console.log(removeDuplicates(array)); 