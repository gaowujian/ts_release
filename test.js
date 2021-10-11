// function sleep(ms) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("");
//     }, ms);
//   });
// }
// async function* g() {
//   yield 1;
//   await sleep(100);
//   yield* [2, 3];
//   // yield* (async function* () {
//   //   await sleep(100);
//   //   yield 4;
//   // })();
// }
// async function f() {
//   for await (const x of g()) {
//     console.log(x);
//   }
// }

// f();

let input = "...";
try {
  JSON.parse(input);
} catch {
  // ^ Notice that our `catch` clause doesn't declare a variable.
  console.log("Invalid JSON given\n\n" + input);
}
