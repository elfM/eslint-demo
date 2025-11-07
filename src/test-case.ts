/**
 * 测试用例文件 - 包含违反 ESLint 配置规则的代码
 * 用于测试 ESLint 规则检测功能
 */

// ========== 违反 no-unused-vars 规则 ==========

// 未使用的变量
let unusedVariable = 'test';
const unusedConstant = 123;
var unusedVar = true;

unusedVariable = 12;

// 未使用的函数参数
function unusedParams(a: string, b: number, c: boolean) {
    return a;
}

// 未使用的导入（如果配置了）
// import { unusedImport } from './some-module';

// ========== 违反 no-console 规则（如果启用） ==========

console.log('测试日志');
console.error('测试错误');
console.warn('测试警告');
console.info('测试信息');
console.debug('测试调试');

// ========== 违反 no-var 规则 ==========

var oldStyleVar = '使用 var 声明';
var anotherVar = 42;

// ========== 违反 prefer-const 规则 ==========

// 使用 let 但未重新赋值
let shouldBeConst = '应该使用 const';
let anotherLet = 100;

// 应该使用 const 的情况
let config = {
    port: 3000,
    host: 'localhost'
};

// ========== 违反 @typescript-eslint/no-explicit-any 规则 ==========

// 使用 any 类型
function processData(data: any): any {
    return data;
}

const ignoredUnusedVariable = 42;

let anyValue: any = '任意类型';
const anyArray: any[] = [1, 2, 3];
const anyObject: { [key: string]: any } = {};

// ========== 违反 @typescript-eslint/explicit-function-return-type 规则 ==========

// 函数缺少返回类型注解
function add(a: number, b: number) {
    return a + b;
}

const multiply = (x: number, y: number) => {
    return x * y;
};

// 异步函数缺少返回类型
async function fetchData(url: string) {
    const response = await fetch(url);
    return response.json();
}

// ========== 违反 @typescript-eslint/no-unused-vars 规则 ==========

// TypeScript 特定的未使用变量
interface UnusedInterface {
    name: string;
    age: number;
}

type UnusedType = string | number;

// 未使用的类型参数
function genericFunction<T, U>(param: T): T {
    return param;
}

// ========== 违反 no-magic-numbers 规则（如果启用） ==========

// 魔法数字
const timeout = 5000;
const maxRetries = 3;
const pageSize = 20;
const port = 8080;

function calculate(amount: number) {
    return amount * 1.1; // 1.1 是魔法数字
}

if (count > 10) { // 10 是魔法数字
    // ...
}

// ========== 违反 @typescript-eslint/no-empty-function 规则 ==========

// 空函数
function emptyFunction() {
}

const emptyArrow = () => {
};

// ========== 违反 @typescript-eslint/no-inferrable-types 规则 ==========

// 可以推断的类型
const name: string = '张三';
const age: number = 25;
const isActive: boolean = true;

name = 1;

// ========== 违反 @typescript-eslint/prefer-as-const 规则 ==========

// 应该使用 as const
const colors = ['red', 'green', 'blue'] as string[];
const status = 'active' as string;

// ========== 违反 no-duplicate-imports 规则 ==========

// 重复导入（如果配置了）
// import { func1 } from './module';
// import { func2 } from './module';

// ========== 违反 @typescript-eslint/ban-ts-comment 规则 ==========

// @ts-ignore 注释
// @ts-ignore
const ignoredError: number = 'string';

// @ts-expect-error 注释（如果配置不允许）
// @ts-expect-error
const expectedError: string = 123;

// ========== 违反 @typescript-eslint/no-non-null-assertion 规则 ==========

// 使用非空断言
let element: HTMLElement | null = document.getElementById('test');
element!.style.display = 'none';

// ========== 混合违反多个规则 ==========

function complexViolation() {
    var oldVar = 'old'; // no-var
    let shouldConst = 42; // prefer-const
    const unused = 'unused'; // no-unused-vars
    console.log('test'); // no-console

    function inner(data: any) { // no-explicit-any, no-empty-function
        return data;
    }

    return oldVar;
}

// ========== 违反 @typescript-eslint/no-unnecessary-type-assertion 规则 ==========

const value = 'test';
const asserted = value as string; // 不必要的类型断言

// ========== 违反 @typescript-eslint/no-var-requires 规则 ==========

// 使用 require（如果配置了）
// const fs = require('fs');

// ========== 导出（可能触发规则） ==========

export {
    unusedVariable,
    unusedConstant,
    processData,
    add,
    multiply
};

// 默认导出
export default complexViolation;

