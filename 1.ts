class A {}
class B extends A {}
class C extends A {}
class D extends A {
  c: string = "";
}
class E extends D {}
let x1 = !true ? new A() : new B(); // A
let x2 = !true ? new B() : new C(); // B | C (previously B)
let x3 = !true ? new C() : new D(); // C | D (previously C)
let a1 = [new A(), new B(), new C(), new D(), new E()]; // A[]
let a2 = [new B(), new C(), new D(), new E()]; // (B | C | D)[] (previously B[])
function f1(x: B | C | D) {
  if (x instanceof B) {
    x; // B (previously B | D)
  } else if (x instanceof C) {
    x; // C
  } else {
    x; // D (previously never)
  }
}
