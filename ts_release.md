### 1.3

- class 中引入 protected 属性 引入元祖 tuple 类型

### 1.4

- 给联合类型引入更严格的限制，包括泛型冲突,
- 支持 const let 关键字，到 target es6，模板字符串，
- 支持 typeof 和 instance of 的类型保护
- 支持 type 类型别名
- 引入了 const enum，优化不同 enum
- 引入了-noEmitOnError 的命令行参数，默认即使错误也会输出

### 1.5

- 支持 ES 6 模块语法
  - 支持整个 namespace 进行引入
  - 使用 from 语法进行重新导出 export xx from "./xx"
  - 支持 import "./" 裸替导入用于引入一些副作用
- 支持对声明和赋值语句的解构操作
- namespace 关键字
  - 内部模块就是在一个文件中的不同模块，外部模块就是现在熟悉的单个文件
  - 在 ts 早前版本，内部模块使用 module 定义，现在使用 namespace 定义
- 支持 const let 关键字到 target es3
- 支持 forof 语法
- 支持修饰器语法
- 支持计算属性名, 在[]中包括一个表达式表示属性名
- 支持 commonjs，amd 以外的 umd 和 system 导出方案
- 优化模板字符串支持到 es3
- tsc 命令支持
  - tsc 不指定输出或者项目目录，会在当前目录查询 tsconfig.json，不存在就去上一级
  - tsc -p 指定项目目录
- 支持 rootDir,noEmitHelpers,newLine,inlineSourceMap,inlineSources 多个命令行参数

### 1.6

- 支持嵌入 JSX 语法，类型检查和编译 JSX 到 js 语法, 必须要在.tsx 文件中使用, .ts 文件不支持
- 引入 intersection type 交叉类型，作为联合类型的补集
- 局部类型声明，支持在一个函数体内声明类型，包括 interface 等等
- 支持 ES6 类表达式，类名可选
  - const p = class {}
- 拓展表达式，支持 extends 表达式，用于类的拓展
- 支持 abstract 抽象类关键字
- 类型别名 type 支持泛型语法
  - type Lazy<T> = T | (() => T);
- 添加更严格的对象类型校验，不允许多余或者错拼的属性
- 支持 async 函数
  ```
    async function test(): Promise<string> {
        return await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("success");
            }, 1000);
        });
    }
  ```
- 支持用户自定义的类型守护, is 语法

```
    function isCat(a: any): a is Cat {
        return a.name === "kitty";
    }
    var x: Cat | Dog;
    if (isCat(x)) {
        x.meow(); // OK, x is Cat in this block
    }
```

- 支持 tsconfig.json 中的 exclude 配置，以及--init 命令行选项

### 1.7

- 支持指数运算符 ** 和 **=, 会被转译为 Math.pow 方法

### 1.8

- 支持在参数列表中，不同泛型间的拓展关系作为约束
- 对 unreachable code 进行友好提示
- 对未使用的变量进行友好提示，通过 allowUnusedLabels 控制
- 无返回的函数默认为 undefined，通过 noImplicitReturns 控制
- 对 switch 语句中无 break 语句，自动掉落的片段进行友好提示，使用 noFallthroughCasesInSwitch 控制
- 优化对 react 的支持
- 引入字符串字面量类型，他们的写法和字符串字面量值一样，只不过放在了类型的位置
- 优化对 forin 的支持
  - 默认情况下 for x in obj 中, x 会被推导为 string 类型
  - 数字索引签名方式 obj[x] 字符串索引签名方式 obj.x
  - 对于类型 T，例如数组来说, 数字索引签名方式会被推断为数组单个元素类型，如果 obj 是 string[], 那么 obj[x] 会推断为 string
- 支持在 ts 中引入 js 文件，通过 --allowJs 控制

### 2.0

- 对 null 和 undefined 支持
  - 由于类型检查器默认 null 和 undefined 可以赋值给任意类型，所以不能手动声明去排除掉两种类型
  - 通过开启 strictNullChecks 严格配置，null 和 undefined 不在处于所有类型的子集中，他们只能复制给自己或者 any 类型，所以之后 undefined 只能赋值给 T | undefined，而不再是 T
- 使用前赋值检查
  - 这项检查值得是一个变量，如果他的类型范围内没有包含 undefined，那么他就必须要先赋值才能使用，没有开启严格模式的时候，undefined 是所有类型的子集，所以不会有影响。

```
let x: number;
let y: number | null;
let z: number | undefined;
x; // Error, reference not preceded by assignment
y; // Error, reference not preceded by assignment
z; // Ok
x = 1;
y = null;
x; // Ok
y; // Ok
```

- 函数里的可选参数，会默认自带一个 undefined 类型，即使没有声明
- 在类型守护中，支持连续的点操作符访问属性
- 表达式操作符号
  - 如果两个包含 null 和 undefined 的类型进行操作，那么结果一定是有值的， 例如 a: number | null, b: number | null 他们使用相加操作符的结果一定是有值的
  - && 会根据左边操作数的类型，选择是否将 null 和 undefined 加入到右操作数
  - || 会把两个操作数联合之后的结果中，排除 null 和 undefined
- 引入！非空操作符
- 支持可分别的联合类型，也被成为 tagged union，标签过的联合类型
- 引入了一个新的基本类型 never，用来表明一个从来没有发生过的值
- 引入了只读属性
  - 只读属性可以有初始器，或者在构造函数中赋值，但是在其他地方不能赋值
- 可以在类，接口，函数和方法中引入 this 参数
  - this 参数是函数的第一个参数，默认情况下 this 是 any 类型, 可以通过--noImplicitThis 进行控制, 这样的话在函数内使用 this 的话就需要先确定 this 的类型才可以，更加安全
  - 如果 this 的类型是 void，那么在函数内不能使用 this 上的属性和方法
  - 尤其是针对回调函数，通过给 this 添加类型，可以用来限制该回调函数被调用的方式
  - 在如下的这种情况下，调用 main 函数传递回调函数的时候，在函数体内的 this 就能获得自动提示显示 name，表明我的回调函数必须要通过 User 类型的实例调用才能有正确的结果和含义

```
class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

function main(cb: (this: User) => void) {
  const p = new User("tony");
  cb.call(p);
}
main(function () {
  console.log(this.name);
});
```

- 对 tsconfig.json 文件中的 include 和 exclude 数值支持 glob 匹配
- 在 tsconfig 中支持多个有关模块解析的属性，包括 baseUrl，path，rootDirs 和 --traceResolution 命令行参数
- 通过 --lib 可以包括多个内置类型声明
- 新增 --noUnusedParameters 和 --noUnusedLocals 的支持
- 支持重复的标识符，例如 多个同名 interface 会合并

### 2.1

- 支持 keyof 关键字，keyof T 可以获取到 T 的所有属性名，是一个联合类型
- 索引访问类型,也称为 lookup types 查找类型，索引操作也能想获取一个值的属性一样，获取一个类型的属性

```
interface Person {
  name: string;
  age: string;
}

type NameType = Person["name"];
```

- 两者配合使用，可以实现类型安全的查找

```
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]; // Inferred type is T[K]
}
```

- 基于上面的 keyof 和查找类型特点，有了新的映射类型
  - 可是实现把一个对象类型的属性全部映射改变成其他类型, 包括统一添加 readonly 标识，可选标识，必须标识，Deferred 标识和 Proxy 标识
  - 对应实现了几个内置工具类型 ReadOny, Required, Partial, Partial, Proxify
  - 通过 Partial 可以实现一个更加安全的 assign 操作，这样的话 assign 只能修改 obj 上的已有属性，而不像是 Object.assign(target: object, ...sources: any[])

```
function assign<T>(obj: T, props: Partial<T>): void {
  for (const key in obj) {
    obj[key] = props[key];
  }
}

```

- 使用 Pick 关键字定义函数类型，并填充函数体
  - 可以把一个对象 T 中所有执行的属性 K 组装成一个数组并返回

```
function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  let result: any;
  for (const item of keys) {
    result[item] = obj[item];
  }
  return result;
}
```

- 使用 Record<K,T> 可以表示任意一个对象
  - K 就是所有属性的联合类型，T 就是属性值的类型
  - 可以把一个对象（包括普通对象和数组对象）中的所有属性值进行一个转换操作，就是一个数组的 map 操作，map 前的类型是 Record<K,T>, map 后的结果类型就是 Record<K,U>
  - T 是一个转换前的对象类型，U 是转换后的对象类型，K 是 T 的所有属性集合
  - 在这个函数中，T 是 string，U 是 number，K 是 foo|bar|baz 他是满足 K extends keyof any 的

```
function mapObject<K extends string, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K, U> {
  const result: any = {};
  for (const key in obj) {
    result[key] = f(obj[key]);
  }
  return result;
}
const names = { foo: "hello", bar: "world", baz: "bye" };
const lengths = mapObject(names, (s) => s.length);
```

- 支持拓展参数和剩余参数，结果类型会进行自动推导
- 没有添加类型的导入
  - 从 2.1 开始，可以在没有类型声明的情况下，导入一个 js 文件模块
  - 如果一个类型声明 例如 declare module "foo" { ... } or node_modules/@types/foo)存在的话，那么它依然能取得较高的优先级

```
// Succeeds if `node_modules/asdf/index.js` exists
import { x } from "asdf";
```

- 优化 any 类型的推导
  - 如果初始类型是 any，根据之后赋值的情况，变量的类型也会变化，这个特性必须要开启 noImplicitAny，否则即使赋值也不能推导类型

```
function f1() {
  let x = [];
  x.push(5);
  x[1] = "hello";
  x.unshift(true);
  return x; // 开启后 (string | number | boolean)[] 不开启是 any[]
}
```

- 支持更好的字面量类型推导
  - const 和 readonly 属性会被自动推导为字面量类型，而不需要手动指定
- 支持 tsconfig 文件的继承以及 alwaysStrict 配置，保证输出结果总是按照严格模式
