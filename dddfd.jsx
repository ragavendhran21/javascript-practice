// function maxNumber(arr){
//     let max = arr[0];
//     let min = [];
//     for(let i=1;i<arr.length;i++){
//         let num = arr[i];
//         if(num > max){
//             max = num
//         } else if(num > secondLargest && num < largest) {
//             min.push(num)
//         }
//     }
//     return {max,min}
// }
// const maxminArray = [1,2,3,44,23,12];
// const result = maxNumber(maxminArray);
// console.log(result.max);
// console.log(result.min);
function maxNumber(arr) {
    let max = arr[0];
    let min = [];
    
    for(let i=1; i<arr.length; i++) {
        let num = arr[i];
        if(num > max) {
            max = num;
        } else {
            min.push(num);
        }
    }
    
    return {max, min};
}

// Test with an array
const ff = [1, 23, 44, 4, 9, 100];
const result = maxNumber(ff);

console.log("Final max:", result.max);
console.log("Values less than max:", result.min);
