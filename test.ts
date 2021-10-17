// import express1 from "express";
// // import * as express2 from "express";
// // express2()
// // console.log("express2:", express2);
// const app1 = express1();
// console.log("app1:", app1);
// // const app2 = express2();
// // console.log("app2:", app2);

// type TypeA = string | number | boolean;
// type TypeB = string;
// type C = Exclude<TypeA, TypeB>;

// function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
//   let result: any = {};
//   for (const item of keys) {
//     result[item] = obj[item];
//   }
//   return result;
// }

// const result = pick(
//   {
//     name: "gaowujia",
//     age: 28,
//     isOpen: true,
//   },
//   "name",
//   "age"
// );

declare function tag<T>(strs: TemplateStringsArray, ...args: T[]): T;
// inference fails because 'number' and 'string' are both candidates that conflict
let a = tag<string | number>`${100} ${"hello"}`;
console.log("a:", a);
