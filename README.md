# koa-vue-demo 项目介绍

## 项目概要

- 后端：koa2 搭建 API 服务
- 前端：Vue.js
- 数据库：MySQL

## 项目结构

```sh
├── init  # 数据库初始化目录
│   ├── index.js  # 初始化入口文件
│   ├── sql/  # sql脚本文件目录
│   └── util/ # 工具操作目录
├── public/  # 静态资源：文件、图片等
├── server/  # 后端服务目录
│   ├── controllers/  # 控制层
│   ├── models/ # 模型层
│   ├── routers/  # 路由目录
│   ├── utils/  # 工具类目录
│   └── app.js  # 后端服务入口文件
├── web/  # 编译后前端代码目录
├── web_src/  # 前端 Vue.js 源码
├── config.js # 配置文件
└── package.json # koa2包管理
```

## 快速启动

### 环境准备

#### 初始化数据库

- 安装 MySQL5.6 以上版本
- 创建数据库 test_db

```sh
create database test_db;
```

- 配置项目 config.js

```sh
module.exports = {
  # 服务端口
  port: 3000,
  # 数据库配置
  database: {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'test_db'
  }
};

```

#### 编译打包前端静态代码

```sh
# 安装前端 Vuejs 依赖：
cd web_src ; npm install

# 编译打包：
npm run build
```

### 启动脚本

```sh
# 退回到项目根目录
cd ..

# 安装后端 koa2 依赖
npm install

# 数据建表初始化
npm run init_sql

# 启动服务
npm run start
# 或
npm run dev
```

### 访问项目 demo

http://localhost:3000
