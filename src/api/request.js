import { extend } from 'umi-request';
const errorHandler = (error) => {
  const { response } = error;
  return response;
};
const req = extend({
  errorHandler, // 默认错误处理
});
export default req;