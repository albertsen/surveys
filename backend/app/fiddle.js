var a = [0, 1, 2, 3, 5]

var b = a.reduce((a2, i) => {
    a2.push("hey" + i);
    return a2;
}, []);
console.log(b);

// var sum = [0, 1, 2, 3].reduce(function (accumulator, currentValue) {
//     return accumulator + currentValue;
//   }, 0);
// console.log(sum);