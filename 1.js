"use strict";
// async function test(): Promise<string> {
//   return await new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("success");
//     }, 1000);
//   });
// }
// test();
// function assign<T extends U, U>(target: T, source: U): T {
//   for (let id in source) {
//     target[id] = source[id];
//   }
//   return target;
// }
// let x = { a: 1, b: 2, c: 3, d: 4 };
// assign(x, { b: 10, d: 20 });
// // assign(x, { e: 0 }); // Error
// let p: { a: number; b: number } extends { a: number } ? string : boolean;
// var a = [1, 2, 3];
// for (var x in a) {
//   // Type of x is implicitly string
//   var obj = a[x]; // Type of obj is MyObject
//   console.log("obj:", obj);
// }
// Compiled with --strictNullChecks
// let x: number;
// let y: number | null;
// let z: number | undefined;
// x; // Error, reference not preceded by assignment
// y; // Error, reference not preceded by assignment
// z; // Ok
// x = 1;
// y = null;
// x; // Ok
// y; // Ok
var x;
var y;
// console.log(x);
console.log(y);
