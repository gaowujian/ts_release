<<<<<<< HEAD
const result = Object.assign({ age: 20 }, { name: "gaowujian" });
console.log("result:", result);
=======
class C {
  foo = "false";
  bar;
  baz = "zzz";
  //  ~~~
  //  Error! Property 'baz' has no initializer and is not definitely assigned in the
  //         constructor.
  constructor() {
    this.foo = 42;
    this.init();
  }
  init() {
    this.baz = true;
  }
}

const c = new C();
console.log("c:", c);
>>>>>>> 49311c8256a1b92d0314ecf53e9f111d652bb98f
