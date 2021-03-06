// 首先引入Mock
const Mock = require('mockjs');

// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: '200-600'
});

let configArray = [];

// 使用webpack的require.context()遍历所有mock文件
const files = require.context('.', true, /\.js$/);
files.keys().forEach((key) => {
  if (key === './index.js') return;
  configArray = configArray.concat(files(key).default);
});

// 注册所有的mock服务
configArray.forEach((item) => {
  for (let [path, target] of Object.entries(item)) {
    //注：截取符号变动
    //以便于区分dataKey为 data|10 这种数组类型
    //由 get|/api/list 更改为 get-/api/list
    let protocol = path.split('-');
    Mock.mock(new RegExp(`^${process.env.VUE_APP_BASE_API}${protocol[1]}`), protocol[0], () => {
      //新增dataKey 以便控制data的层级为Array 取至url-后的数据
      //例如 get-/api/list-data|10 即data对应10个元素的数组
      const DATA_KEY = protocol[2] || 'data'
      return Mock.mock({
        resultCode: 0,
        message: 'success',
        [DATA_KEY]: target
      })
    });
  }
});