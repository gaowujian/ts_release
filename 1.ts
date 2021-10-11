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

// interface Options {
//   location?: {
//     x?: number;
//     y?: number;
//   };
// }
// function foo(options?: Options) {
//   if (options && options.location && options.location.x) {
//     const x = options.location.x; // Type of x is number
//   }
// }

// function sum(a: number | null, b: number | null) {
//   return a + b; // Produces value of type number
// }

// interface Entity {
//   name: string;
// }

// let x: Entity | null = {
//   name: "wujian",
// };
// let s = x && x.name; // s is of type string | null
// let y = x || { name: "test" }; // y is of type Entity

// interface UIElement {
//   addClickListener(onclick: (this: void, e: Event) => void): void;
// }
// class Handler {
//   info: string;
//   constructor(info: string) {
//     this.info = info;
//   }
//   onClickBad(this: Handler, e: Event) {
//     // oops, used this here. using this callback would crash at runtime
//     this.info = e.type;
//   }
// }
// let h = new Handler("11");
// uiElement.addClickListener(h.onClickBad); // error!
// class Person {
//   age: string;
//   constructor(age: string) {
//     this.age = age;
//   }
// }

// class User {
//   name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
// }

// function main(cb: (this: User) => void) {
//   const p = new User("gaowujian");
//   cb.call(p);
// }
// main(function (this: User) {
//   console.log(this.name);
// });

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]; // Inferred type is T[K]
}

// interface Person {
//   name: string;
//   age: string;
// }
// type Deferred<T> = {
//   [P in keyof T]: Promise<T[P]>;
// };
// // Wrap proxies around properties of T
// type Proxify<T> = {
//   [P in keyof T]: { get(): T[P]; set(v: T[P]): void };
// };
// type NameType = Person["name"];
// type a = Partial<Person>;
// type b = Required<Person>;
// type c = Readonly<Person>;
// type d = Deferred<Person>;
// type e = Proxify<Person>;

// type MPick<T, K extends keyof T> = {
//   [key in K]: T[key];
// };

// function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
//   let result: any;
//   for (const item of keys) {
//     result[item] = obj[item];
//   }
//   return result;
// }
// const person = {
//   name: "tony",
//   age: 29,
// };
// const nameAndAgeOnly = pick(person, "name", "age");
// console.log(nameAndAgeOnly);

// function mapObject<K extends string, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K, U> {
//   const result: any = {};
//   for (const key in obj) {
//     result[key] = f(obj[key]);
//   }
//   return result;
// }
// const names = { foo: "hello", bar: "world", baz: "bye" };
// const lengths = mapObject(names, (s) => s.length);
// console.log("lengths:", lengths);

// let obj = { x: 1, y: "string" };

// var newObj = { ...obj, z: 3, y: 4 };
const obj = {
  a: 10,
};

class User {
  readonly name: string;
  constructor(name: string = "tony") {
    this.name = name;
  }
}

const a = new User();
