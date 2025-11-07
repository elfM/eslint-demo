/* eslint-env browser, node */
/* global var1:readonly, var2:writable */
/* eslint-disable no-alert */
/* eslint eqeqeq: "off", curly: "error" */
// 这一部分是整个文件生效


// 单行生效
const x = 1; // eslint-disable-line no-unused-vars


// 块状配置
function example() {
    // eslint-disable-next-line no-console
    console.log('hello');

    // eslint-disable-next-line no-eval
    const result = eval('2 + 2');
}

/* eslint-enable no-alert */
alert('hello');