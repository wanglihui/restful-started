# restful-started

简化使用ts-express-restful 模块时的各种配置,一句启动服务器
```javascript
    require("restful-started")
        .configRoute({})
        .configDb({url: "postgres://"})
        .start({});
```

### 约定
- 如果调用configRoute 时未配置参数，将扫描 程序运行路径下所有文件去查找 ts 注解
- 如果未配置 model path 将查找程序运行路径下 model文件夹去找 model 生成数据库
- 可用注解参考 [ts-express-restful](https://www.npmjs.com/package/ts-express-restful) 模块
- 具体使用参考 example文件

### 配置

- configRoute 可用配置
```typescript
export interface IRouteOptions { 
    scannerDir?: string;
    urlPrefix?: string;
}
```

- configDb 可用配置
```typescript
export interface IDatabaseOptions { 
    modelDir?: string;
    force?: boolean;
    url?: string;
}
```

- 启动start 可用参数
```typescript
export interface IServerOptions { 
    listen?: PORT;
}
```