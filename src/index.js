
// function count() {
//     const a = 30;
//     for (let i = 0; i < 10; i++) {
//         a += i;
//     }
// }

/**
 * 解析 URL query 字符串为对象格式
 * @param {string} queryString - URL query 字符串，例如 "?name=张三&age=25&city=北京"
 * @returns {Object} 解析后的对象
 */
function parseQueryString(queryString) {

    // 如果输入为空或不是字符串，返回空对象
    if (!queryString || typeof queryString !== 'string') {
        console.error('queryString is not a string');
        return {};
    }

    // 移除开头的 '?' 字符（如果存在）
    const cleanQuery = queryString.startsWith('?') ? queryString.slice(1) : queryString;

    // 如果清理后的字符串为空，返回空对象
    if (!cleanQuery) {
        return {};
    }

    // 分割参数对
    const pairs = cleanQuery.split('&');
    const result = {};

    pairs.forEach(pair => {
        // 跳过空字符串
        if (!pair) return;

        // 分割键值对
        const [key, value] = pair.split('=');

        // 如果键存在
        if (key) {
            // 解码 URL 编码的字符
            const decodedKey = decodeURIComponent(key);
            const decodedValue = value ? decodeURIComponent(value) : '';

            // 如果键已存在，转换为数组或追加到数组
            if (result.hasOwnProperty(decodedKey)) {
                if (Array.isArray(result[decodedKey])) {
                    result[decodedKey].push(decodedValue);
                } else {
                    result[decodedKey] = [result[decodedKey], decodedValue];
                }
            } else {
                result[decodedKey] = decodedValue;
            }
        }
    });

    return result;
}

/**
 * 从当前页面 URL 解析 query 参数
 * @returns {Object} 解析后的对象
 */
function getCurrentQueryParams() {
    if (typeof window !== 'undefined' && window.location) {
        return parseQueryString(window.location.search);
    }
    return {};
}

// 示例用法
console.log('=== URL Query 解析示例 ===');

// 示例 1: 基本用法
const query1 = '?name=张三&age=25&city=北京';
console.log('示例 1:', parseQueryString(query1));
// 输出: { name: '张三', age: '25', city: '北京' }

// 示例 2: 包含 URL 编码的字符
const query2 = '?search=hello%20world&category=编程&level=高级';
console.log('示例 2:', parseQueryString(query2));
// 输出: { search: 'hello world', category: '编程', level: '高级' }

// 示例 3: 重复参数（会转换为数组）
const query3 = '?tag=JavaScript&tag=Node.js&tag=React';
console.log('示例 3:', parseQueryString(query3));
// 输出: { tag: ['JavaScript', 'Node.js', 'React'] }

// 示例 4: 空值处理
const query4 = '?name=张三&age=&city=北京&hobby';
console.log('示例 4:', parseQueryString(query4));
// 输出: { name: '张三', age: '', city: '北京', hobby: '' }

// 示例 5: 空字符串和无效输入
console.log('示例 5 - 空字符串:', parseQueryString(''));
console.log('示例 5 - null:', parseQueryString(null));
console.log('示例 5 - undefined:', parseQueryString(undefined));

// ========== 违反 example/no-magic-numbers 规则的示例 ==========
// 以下代码会触发 no-magic-numbers 规则警告

// 示例 1: 使用魔法数字作为超时时间
function fetchDataWithTimeout() {
    const timeout = 5000; // 魔法数字：5000 不在忽略列表中
    return timeout;
}

// 注意：以下数字不会触发警告（在忽略列表中：0, 1, -1）
const zero = 0; // 不会触发警告（在 ignore 列表中）
const hundred = 100; // 会触发警告（100 不在 ignore 列表中，推荐配置只忽略 0, 1, -1）

// 示例使用let声明的常量
function testLet() {
    let a = 10;

    return a;
}

testLet();

// 导出函数供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        parseQueryString,
        getCurrentQueryParams
    };
}
