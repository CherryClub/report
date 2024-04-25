const domainName = 'localhost'
const port = '8080'

// 代理中间对象生成函数
/**
 *
 * @param {{
*   name: string,
*   target: string,
*   rewriteMatch?: string,
*   rewriteResult?: string,
*   changeOrigin?: boolean,
*   ws?: boolean,
* }} param0
* @returns {{
*   name: string,
*   value: {
*     target: string,
*     changeOrigin: boolean,
*     pathRewrite: {
*       [key: string]: string
*     },
*     ws: boolean,
* }}
*/
function proxyFactory({
 name,
 target,
 rewriteMatch,
 rewriteResult,
 changeOrigin = true,
 ws = false,
}) {
 let pathRewrite = {};
 if (!rewriteMatch) {
   rewriteMatch = `^${name}`;
 }
 if (!rewriteResult) {
   rewriteResult = "";
 }
 pathRewrite[rewriteMatch] = rewriteResult;
 let value = {
   target,
   changeOrigin,
   pathRewrite,
   ws,
 };
 return { name, value };
}

const proxy = {};
{
 // 代理配置
 [
   proxyFactory({
     name: process.env.VUE_APP_BASE_API,
     target: `http://${domainName}:${port}`,
   }),
 ].forEach(({ name, value }) => {
   proxy[name] = value;
 });
}

module.exports = proxy;
