import request, { extend } from 'umi-request';
// import 'yet-another-abortcontroller-polyfill';
// const controller = new AbortController();
// const { signal } = controller;

// signal.addEventListener('abort', () => {
//     console.log('aborted!');
// });

const errorHandler = (error) => {
    const { response } = error;
    return response;
};
const req = extend({
    errorHandler, // 默认错误处理
});

request.interceptors.request.use(async (url, options) => {
    // request(url, {
    //     signal,
    // });
    if (
        options.method === 'post' ||
        options.method === 'put' ||
        options.method === 'delete' ||
        options.method === 'get'
    ) {
        let headers;
        if (url === 'http://192.168.1.235:8081/v1/getIpfsHash') {
            headers = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Headers': '*',
            };
        }
        return {
            url,
            // url: `http://116.236.41.244:9000${url}`,
            options: { ...options, headers },
        };
    }
});
// PubSub.subscribe('apionclick', (msg, index) => {
//     console.log(111);
//     controller.abort();
// });
export default req;
