# 后台管理系统前端base框架

#### 本案例的主要目的是：构建后台管理系统的base框架（前端）
>基于vue全家桶，element-ui
>提供开发规范及文件目录说明
>可自动配置多开发/部署环境

#### 重点实现的框架类功能：
>登录拦截 、主题切换 、全局面包屑、进入详情页前缓存当前页数据、打包/开发环境自动化配置

#### 插件封装（二次封装）
>时间范围选择框

#### 主要使用的插件
>vue-router (路由)\
>vue-bus (负责与业务无关的组件信息传输)\
>vuex (负责用户等相关信息的存储)\
>iconfont (阿里图标库)\
>axios (封装了请求工具类)
>element-ui (使用各种功能组件和封装)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9091 （开发环境地址）
npm run dev

# 打包正式环境，使用的正式环境地址
npm run build

# 打包测试环境，使用的测试环境地址，地址在global.js中配置
npm run build -- test
```

