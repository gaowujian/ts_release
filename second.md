### 2.2

- 支持混合类 （mixin classes）
- 新增 object 类型
- 优化对表达式中 null/undefined 值的检查, 这些情况被会标记为错误
  - +的任意一个参数是空值，或者两个参数都不是 any 或者 string
  - -, \*, \*\*, /, %, <<, >>, >>>, &, |, 或者 ^的任意操作数为空值
  - <, >, <=, >=, 或者 in 的任意操作数为空值
  - instanceof 的右操作数为空值
  - +, -, ~, ++, 或 -- 等一元运算符的操作数为空值
  - 一个操作数的值是 null 或者 undefined，或者是 union 类型中，包含 null 或 undefined，都被认为是空值
- 对于字符串索引签名类型来说，从 2.2 开始支持，使用点语法也可以访问
  ```
  interface StringMap<T> {
    [x: string]: T;
    }
    const map: StringMap<number> = {};
    map["prop1"] = 1;
    map.prop2 = 2;  //2.2版本之前,这一行提示prop2类型不存在StringMap上
  ```
- 支持在 jsx 上使用 spread 运算符展开传入参数

### 2.3

- 迭代器 iterator, 暴露 next,return 和 throw 三个方法,return 和 throw 可选

  - 一个对象是 iterable,表明对象的 Symbol.iterator 属性指向了一个返回 iterator 对象的函数

  ```
    const obj = {
        name: "gaowujian",
        age: 18,
    };
    obj[Symbol.iterator] = function () {
        const context = this;
        const keys = Object.keys(this);
        let index = 0;
        return {
            next() {
                return {
                    value: context[keys[index++]],
                    done: index > keys.length,
                };
            },
        };
    };
    for (const item of obj) {
        console.log("item:", item);
    }

  ```

- 在 2.3 之后,ts 对迭代器和生成器提供了全面的支持,针对 target 是 es3/es5,并激活 downLevelIteration 选项
- 同时在 2.3 中,添加了对异步迭代器和生成器的支持, 使用 for await of 语句,起因是 js 中的提案 https://github.com/tc39/proposal-async-iteration
  - 异步迭代器的支持来源于 Symbol.asyncIterator 在运行时存在
  - 需要在 lib 中引入 esnext
  - 如果 target 是 es3/es5，需要激活 downlevelIteration 选项
- 支持对泛型参数添加默认值
  - 在 extends 的类型后面，可以给默认拓展类型添加一个默认值

```
function create<T extends HTMLElement = HTMLDivElement, U = T[]>(element?: T, children?: U): Container<T, U>;

```

- 新增 tsconfig 中的 strict 配置，默认开启一系列的严格检查

### 2.4

- 支持 import 动态导入语法
  ```
  async function getZipFile(name: string, files: File[]): Promise<File> {
    const zipUtil = await import("./utils/create-zip-file"); // 在2.3版本这一行会提示 expect express，表示await后需要跟一个表达式
    const zipContents = await zipUtil.getContentAsBlob(files);
    return new File(zipContents, name);
  }
  ```
- 字符串枚举，支持在枚举中给成员进行初始化
- 优化泛型推导

  - 返回类型作为推导的目标

  ```
  function arrayMap<T, U>(f: (x: T) => U): (a: T[]) => U[] {
    return (a) => a.map(f);
    }
    const lengths: (a: string[]) => number[] = arrayMap((s) => s.length);
    在2.4版本之前，s不会推导出string，而是{}，所以s.length会报错

  ```

  - 从上下文的类型中推导泛型的参数类型

  ```
  在2.4版本之前，这个y会被推导为any类型，所以可以访问foo和bar属性
  在2.4版本之后，y的类型推导为T，默认是受到了{}的约束，不能直接使用y()调用签名
  let f: <T>(x: T) => T = y => y() + y.foo.bar;
  ```

- 优化弱类型推导
  - 弱类型指的是一个只包含可选属性的对象类型
  - 如果形式参数和实际参数的属性完全没有交际，在 2.4 版本之后会警告，在此之前不会
  - 有几点类型上的建议
    - 如果属性确实存在的话，不要使用可选属性修饰
    - 在一个弱类型中添加一个索引签名，可以帮助接受所有属性
    - 可以使用类型断言

### 2.5

- 支持在 catch 语句块内省略变量名
  ```
  let input = "...";
  try {
    JSON.parse(input);
  } catch {
    // ^ Notice that our `catch` clause doesn't declare a variable.
    console.log("Invalid JSON given\n\n" + input);
  }
  在2.5版本之前，由于在catch语句块中，没有声明input变量，会引起一个语法错误
  ```

### 2.6

- 严格的函数类型，引入一个新的 strict 规则，strictFunctionTypes
  - 在函数进行赋值的过程中，要保证参数和返回值的兼容性
- 引入 locale 参数，支持中文报错，tsc --locale zh-cn 1.ts
- 支持@ts-ignore 来忽略报错
  ```
  if (false) {
  // @ts-ignore: Unreachable code error
  console.log("hello");
  }
  ```
- 引入 watch 参数，可以用来监听文件变化并重新编译

### 2.7

- 支持不可变命名的参数，通俗点说就是通过利用计算属性语法的特性，把一个 const 变量本身，作为对象的属性
  ```
  const Foo = "Foo";
  const Bar = "Bar";
  let x = {
    [Foo]: 100,
    [Bar]: "hello"
  };
  let a = x[Foo]; // has type 'number'
  let b = x[Bar]; // has type 'string'
  ```
- 引入一个新的 strict 规则， strictPropertyInitialization，用来查看所有的属性都必须在构造函数中初始化，或者通过一个属性初始器来初始化

  ```
  class C {
    foo: number;
    bar = "hello"; //属性初始化器
    baz: boolean; //报错，没有任何形式的初始化
    constructor() {
      this.foo = 42; //构造函数内初始化
    }
  }
  ```

  - 在一些特定的情况下，如果不能通过直接初始化的方式的话，就需要给这个属性添加一个确定初始化断言(definite initialization assertion)，类似于非空断言

  ```
  class C {
    baz!: boolean; //使用了确定初始化断言，并在构造函数中通过调用其他函数来间接实现初始化
    constructor() {
      this.foo = 42;
      this.init();
    }
    init() {
      this.baz = true;
    }
  }

  ```

  - 针对对象字面量的推导进行了优化
