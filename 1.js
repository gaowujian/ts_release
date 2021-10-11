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
