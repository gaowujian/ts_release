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
