// 测试 prefer-const 规则

// 情况 1: let 声明但未重新赋值 - 应该触发警告
let a = 'error';
console.log(a);

// 情况 2: let 声明并重新赋值 - 不应该触发警告
let b = 'test';
b = 'new value';
console.log(b);

// 情况 3: const 声明 - 不应该触发警告
const c = 'const value';
console.log(c);

// 情况 4: let 声明但未使用 - 应该触发警告
let d = 'unused';

// 情况 5: let 声明在循环中重新赋值 - 不应该触发警告
let sum = 0;
for (let i = 0; i < 10; i++) {
    sum = sum + i;
}

