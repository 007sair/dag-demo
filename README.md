# dag-demo

> 前端 DAG（Directed acyclic graph） 演示项目

## 准备工作

### 前置依赖

该项目依赖 [vite](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)，请确保 nodejs 版本大于 14.18。

项目使用 [pnpm](https://www.pnpm.cn/) 管理包依赖，请先确保已经安装过 pnpm

### 安装

进入到该项目根目录，使用如下命令安装依赖：

```shell
pnpm install
```

### 启动

```shell
pnpm dev
```

### 构建

构建会生成 `dist` 目录

```shell
pnpm build
```

### 部署

请先确保已构建出 dist 目录。

```shell
# 1.发布
netlify deploy --prod
# 2.输入 ./dist 目录
```

## 开发

### 关于算子

算子配置存放在 `/public/operators.json` 中，使用 `pnpm build` 后会在 `dist` 目录下也生成一份。

算子配置格式如下：

```ts
// 单个算子配置
type Operator = {
  /**
   * 节点类型，决定节点在UI上有几个 Handle
   * - input：节点下边1个点
   * - default：上下边各1个点
   * - output：上边1个点
   */
  type: "input" | "default" | "output";
  fixedArgs: {
    opName: string;
    opType: "INPUT" | "OPERATOR" | "SINK";
    opClass: string;
    input: string;
    output: string;
  };
  // 算子业务属性
  properties: object;
};

// 整个算子配置类型
type OperatorJSON = {
  operatorNames: string[];
  operators: Record<string, Operator>;
};
```
