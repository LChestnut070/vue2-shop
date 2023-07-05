## 优化

```bash
# store

1.变更store,以命名空间划分

2.将请求分类列表数据进行session缓存,以减轻服务器压力
# search

1.从首页搜索框与搜索页搜索框进行搜索不带query参数，从分类列表进行搜索不带params参数

# detail
1.使用$bus全局总线,同步放大镜与图片轮播图

```

# vue2-shop

> A Vue.js project

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
