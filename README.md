## react项目网页中点击元素跳转对应组件

### 使用方式

1. `npm i @released/check-lines`

2. 运行命令`npx zline --PORT 7000`  指定端口启动服务

3. 客户端入口文件中导入client进行初始化


```js
import client from '@released/check-lines'
//  在主入口文件中调用
client()
```
4. 配置loader
 >  webpack中配置loader插件
```js
{
          test: /\.(ts|js)$/,
          use: '@released/check-lines',
          exclude: /node_modules/
}
```

> nextjs中的配置loader插件
- next.config.js 配置如下

```js
const nextConfig = {
  webpack: config => {
    if(process.env.LOCAL){
      config.module.rules.push(
        {
          test: /\.(ts|js)$/,
          loader: '@released/check-lines',
          exclude: /node_modules/
        }
      )
    }
    return config
  },
  env:{
    LOCAL: !!process.env.LOCAL
  },
}
```
5. 跳转组件

- mac下        command/shift + 单击网页元素会自动跳转vscode代码中的对应组件
- windows下   win/shift + 单击网页元素会自动跳转vscode代码中的对应组件
###  注意vscode需要配置code命令

> ctrl + shift + p 搜索code  选择code命令配置