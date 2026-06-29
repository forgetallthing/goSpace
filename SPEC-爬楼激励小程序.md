# 爬楼激励小程序 SPEC

## 1. 文档目的
本文档描述基于 uniapp 的微信小程序技术实现方案，覆盖页面结构、数据模型、核心交互、接口建议、状态流转和勋章墙布局算法。

### 设计理由
- PRD 解决“做什么”和“为什么做”，SPEC 解决“怎么做”。
- 提前把勋章配置、星级规则和布局方式固化，避免开发过程中对展示逻辑产生歧义。

## 2. 技术栈
- 前端框架：uniapp + Vue 3
- 运行端：微信小程序
- 状态管理：Pinia
- 请求封装：uni.request 二次封装
- 动效方案：CSS 动画 + 小程序兼容的轻量动画方案，必要时引入按需的粒子/光效组件
- 后端框架：Node.js + NestJS
- 数据库：MongoDB + Mongoose
- 鉴权方式：JWT
- 接口形式：REST API
- 文档工具：Swagger/OpenAPI

### 技术路线选择
- 前端采用 uniapp + Vue 3，可以兼顾小程序主端和后续多端扩展。
- 后端采用 NestJS，可以获得清晰的分层、模块化能力和更好的工程约束，适合中长期维护。
- 数据库采用 MongoDB，适合勋章配置、用户状态、解锁记录这类结构灵活、扩展频繁的数据。
- ORM/ODM 采用 Mongoose，便于定义 Schema、索引和聚合查询。

### 设计理由
- uniapp 适合小程序优先且未来可扩展其他端。
- NestJS 比轻量 Express 更适合做中大型后端的模块化管理，能降低后续复杂度。
- MongoDB 在勋章配置和运营玩法经常调整的场景下更灵活，不需要频繁改表结构。
- JWT 适合前后端分离的登录态维护，便于小程序调用。
- 动效采用轻量方案，优先保证小程序性能和兼容性。

## 3. 页面结构

### 3.1 首页
模块组成：
- 顶部用户概览区
- 总爬楼层数展示
- 总爬楼米数展示
- 勋章墙主视图
- 当前目标提示区
- 勋章详情弹窗

交互要求：
- 首页首屏优先展示层数、米数和当前勋章。
- 页面加载后自动滚动或定位到当前勋章节点。
- 点击任意勋章打开详情弹窗。

### 3.2 我的页面
模块组成：
- 登录状态卡片
- 头像、昵称、手机号等资料区
- 个人累计数据区
- 资料编辑入口

交互要求：
- 未登录态展示登录引导。
- 登录后可编辑基础资料。

### 3.3 可视化后台管理端
模块组成：
- 登录页面
- 统计主页
- 勋章配置页面
- 小程序用户信息页面

交互要求：
- 后台无需注册，仅允许预置管理员账号登录。
- 管理员用户名固定为 `su`，密码固定为 `su`。
- 登录后展示左侧菜单和顶部状态栏，菜单至少包含主页、勋章配置、小程序用户信息。
- 主页以统计卡片方式展示核心运营数据。
- 勋章配置页面支持新增、编辑、停用、删除勋章。
- 小程序用户信息页面支持按关键字检索和分页查看用户资料。

## 4. 核心数据模型

### 4.1 用户爬楼数据 user_stair_data
- userId: 用户标识
- totalFloors: 累计楼层数
- totalMeters: 累计米数
- updatedAt: 更新时间

### 4.2 勋章配置 medal_config
- medalId: 勋章标识
- name: 勋章名称
- description: 勋章说明
- backgroundImage: 背景图
- iconImage: 勋章图形
- baseMeters: 基础解锁米数
- starLevel: 星级，1/2/3
- unlockMeters: 实际解锁米数
- sortOrder: 展示顺序
- status: 启用/停用

### 4.3 用户勋章状态 user_medal_status
- userId: 用户标识
- medalId: 勋章标识
- unlocked: 是否解锁
- unlockedAt: 解锁时间
- progressMeters: 当前到该勋章的进度

### 设计理由
- 勋章配置与用户状态分离，后台可随时改配置而不破坏历史数据。
- 将 unlockMeters 显式存储，便于计算星级和展示条件，避免前端重复推导复杂规则。

## 5. 勋章规则

### 5.1 星级规则
- 勋章支持一星、二星、三星。
- 星级对应的解锁米数由后台配置，不强依赖固定倍数。
- 例如“登上天坛”可配置为：
  - 1 星：100 米
  - 2 星：200 米
  - 3 星：900 米

### 5.2 解锁规则
- 当用户累计米数达到 medal_config.unlockMeters 时，标记对应勋章解锁。
- 解锁后应立即刷新首页展示状态。
- 若同一勋章有多个星级，则按星级逐级解锁。

### 设计理由
- 采用配置化阈值而不是前端写死倍数，才能支持不同勋章的差异化运营。
- 星级允许非线性增长，便于设计“低门槛获得感 + 高阶长期目标”。

## 6. 勋章墙布局方案

### 6.1 布局原则
- 以“当前勋章”为定位锚点。
- 锚点下方展示已获得勋章，使用亮色或高饱和态。
- 锚点上方展示未获得勋章，使用暗色或低透明度态。
- 整体采用向上的流式布局，形成“向上攀登”的隐喻。

### 5.2 解锁规则
- 当用户累计米数达到 medal_config.unlockMeters 时，标记对应勋章解锁。
- 解锁后应立即刷新首页展示状态。
- 若同一勋章有多个星级，则按星级逐级解锁。

### 设计理由
- 采用配置化阈值而不是前端写死倍数，才能支持不同勋章的差异化运营。
- 星级允许非线性增长，便于设计“低门槛获得感 + 高阶长期目标”。

## 6. 勋章墙布局方案

### 6.1 布局原则
- 以“当前勋章”为定位锚点。
- 锚点下方展示已获得勋章，使用亮色或高饱和态。
- 锚点上方展示未获得勋章，使用暗色或低透明度态。
- 整体采用向上的流式布局，形成“向上攀登”的隐喻。

### 6.2 布局实现建议
- 勋章墙用纵向容器承载。
- 根据用户当前最高已解锁勋章索引计算锚点位置。
- 渲染时分三段：已获得区、当前定位区、未获得区。
- 默认滚动到当前勋章附近，保留上下文，避免只看到局部状态。

### 设计理由
- 向上流式布局与“爬楼”主题天然一致，能强化行为隐喻。
- 锚定当前勋章既能让用户明确“我在哪”，也能让未来目标一眼可见。

## 7. 勋章详情弹窗

### 7.1 展示内容
- 勋章名称
- 星级
- 解锁条件
- 详细说明
- 对应背景图
- 当前状态：已解锁 / 未解锁

### 7.2 交互规则
- 点击勋章打开弹窗。
- 未解锁勋章仍可点击查看目标与差距。
- 弹窗支持关闭回到原滚动位置。

### 设计理由
- 让未获取勋章也可被查看，能把“未知奖励”转成“可预期目标”，提升收藏欲。

## 8. 动效方案

### 8.1 解锁动效
- 勋章出现时使用缩放 + 轻微旋转 + 发光过渡。
- 解锁瞬间增加粒子或光晕反馈。
- 勋章墙可用轻微上浮/呼吸效果强调“可收集”。
- 弹窗打开采用淡入 + 轻弹出效果。

### 设计理由
- 激励类产品的关键不是“信息准确”而是“情绪反馈足够强”。
- 动效只服务关键时刻，避免持续高频动画造成疲劳和性能问题。

## 9. 接口建议

### 9.1 接口规范
- 统一返回结构：`code`、`message`、`data`、`traceId`
- 成功码建议使用 `0`
- 鉴权失败建议使用 `40101`
- 参数校验失败建议使用 `400xx`
- 资源不存在建议使用 `404xx`
- 服务端异常建议使用 `500xx`

### 9.2 核心接口表

| 接口 | 方法 | 鉴权 | 主要请求参数 | 主要返回数据 | 说明 |
|---|---|---|---|---|---|
| /api/auth/wechat/login | POST | 否 | code | accessToken, refreshToken, user, needProfileComplete | 小程序首次登录或刷新登录态 |
| /api/auth/refresh | POST | 否 | refreshToken | accessToken, refreshToken | 刷新登录态 |
| /api/auth/logout | POST | 是 | 无 | 无 | 退出登录，失效 refreshToken |
| /api/stair/home | GET | 是 | 无 | userSummary, medalWall, currentMedal, nextMedal | 首页聚合数据 |
| /api/stair/records | POST | 是 | meters, floors, recordTime, remark | recordId, updatedSummary, unlockedMedals | 新增一次爬楼记录 |
| /api/stair/records | GET | 是 | page, pageSize | list, total | 爬楼记录列表 |
| /api/medals | GET | 是 | status, page, pageSize | list, total | 勋章配置列表 |
| /api/medals/{medalId} | GET | 是 | medalId | medalDetail | 勋章详情 |
| /api/user/profile | GET | 是 | 无 | profile, stairSummary, medalCount | 我的页面数据 |
| /api/user/profile | PUT | 是 | nickname, avatar, gender, birthday, height, weight | profile | 更新用户资料 |

### 9.3 接口说明
- `/api/auth/wechat/login` 只接收 `wx.login` 返回的 `code`，由服务端调用微信接口换取 `openid` 和 `session_key`。
- `/api/stair/home` 采用聚合返回，避免首页多次请求。
- `/api/stair/records` 负责写入爬楼行为并触发勋章解锁计算。
- `/api/medals` 面向前台展示和后台管理共用，后台可按状态筛选。
- `/api/user/profile` 用于“我的”页面展示和维护。

### 设计理由
- 首页接口合并返回核心数据，减少小程序首屏请求次数。
- 勋章详情单独接口便于后台配置内容独立更新。
- 爬楼记录写入和勋章计算放在同一个后端事务边界内，避免前端自行判断导致状态不一致。

## 10. MongoDB 数据表设计

### 10.0 数据库边界约束
- 研发和联调阶段仅允许操作本机 MongoDB 中的 `goSpace` 数据库。
- 后端连接串默认指向 `mongodb://127.0.0.1:27017/goSpace`，不得切换到其他数据库名称。
- 代码只能创建、读取、更新、删除 `goSpace` 库下的集合，不能访问其他数据库或外部实例。
- 若本机 MongoDB 启用了认证、端口变更或副本集配置，需要补充完整连接串后再启动后端。

### 设计理由
- 限定数据库边界可以避免联调时误操作其他库，降低数据污染风险。
- 将连接目标固定到 `goSpace`，可以让前后端和种子脚本保持一致，减少环境差异。

### 10.1 users 集合
用途：存储用户基础身份和登录信息。

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| _id | ObjectId | 是 | 主键 |
| openid | string | 是 | 微信用户唯一标识 |
| unionid | string | 否 | 微信开放平台统一标识 |
| nickname | string | 否 | 用户昵称 |
| avatarUrl | string | 否 | 头像地址 |
| gender | number | 否 | 性别 |
| birthday | date | 否 | 生日 |
| height | number | 否 | 身高 |
| weight | number | 否 | 体重 |
| status | string | 是 | active / disabled |
| createdAt | date | 是 | 创建时间 |
| updatedAt | date | 是 | 更新时间 |

建议索引：
- `openid` 唯一索引
- `unionid` 普通索引

### 10.2 stair_records 集合
用途：存储每一次爬楼记录，支持统计和追溯。

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| _id | ObjectId | 是 | 主键 |
| userId | ObjectId | 是 | 用户引用 |
| meters | number | 是 | 本次爬楼米数 |
| floors | number | 是 | 本次爬楼楼层数 |
| recordTime | date | 是 | 记录时间 |
| remark | string | 否 | 备注 |
| source | string | 否 | manual / import / device |
| createdAt | date | 是 | 创建时间 |

建议索引：
- `userId + recordTime` 复合索引

### 10.3 medal_configs 集合
用途：后台配置勋章、星级和解锁阈值。

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| _id | ObjectId | 是 | 主键 |
| medalKey | string | 是 | 勋章业务标识 |
| name | string | 是 | 勋章名称 |
| starLevel | number | 是 | 星级 1/2/3 |
| baseMeters | number | 是 | 基础米数 |
| unlockMeters | number | 是 | 实际解锁米数 |
| description | string | 是 | 文字说明 |
| iconImage | string | 否 | 勋章图形 |
| backgroundImage | string | 否 | 背景图 |
| sortOrder | number | 是 | 展示顺序 |
| status | string | 是 | enabled / disabled |
| createdAt | date | 是 | 创建时间 |
| updatedAt | date | 是 | 更新时间 |

建议索引：
- `medalKey + starLevel` 唯一索引
- `status + sortOrder` 复合索引

### 10.4 user_medal_status 集合
用途：存储用户与勋章的解锁状态。

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| _id | ObjectId | 是 | 主键 |
| userId | ObjectId | 是 | 用户引用 |
| medalConfigId | ObjectId | 是 | 勋章配置引用 |
| unlocked | boolean | 是 | 是否解锁 |
| unlockedAt | date | 否 | 解锁时间 |
| progressMeters | number | 是 | 到该勋章的进度 |
| snapshotName | string | 是 | 解锁时勋章名称快照 |
| snapshotUnlockMeters | number | 是 | 解锁时阈值快照 |
| createdAt | date | 是 | 创建时间 |
| updatedAt | date | 是 | 更新时间 |

建议索引：
- `userId + medalConfigId` 唯一索引
- `userId + unlocked` 复合索引

### 10.5 refresh_tokens 集合
用途：保存刷新令牌，支持退出登录和主动失效。

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| _id | ObjectId | 是 | 主键 |
| userId | ObjectId | 是 | 用户引用 |
| tokenHash | string | 是 | refreshToken 哈希值 |
| expiredAt | date | 是 | 过期时间 |
| revokedAt | date | 否 | 失效时间 |
| createdAt | date | 是 | 创建时间 |

建议索引：
- `tokenHash` 唯一索引
- `expiredAt` TTL 索引

### 设计理由
- 用户、记录、勋章配置和用户勋章状态分表，便于独立查询和扩展。
- 勋章状态中保留快照字段，避免后续修改勋章名称或阈值后影响历史解锁展示。
- refresh token 单独存储可以支持退出登录、设备踢下线和安全失效控制。

## 11. 可视化后台管理设计

### 11.1 后台登录规则
- 后台不开放注册入口。
- 管理员账号固定为 `su`，密码固定为 `su`。
- 后端提供独立的后台登录接口，登录成功后签发后台 JWT。
- 后台 JWT 仅用于管理端接口，不与小程序用户 JWT 混用。

### 11.2 后台页面结构
- 登录页：用户名、密码、登录按钮、错误提示。
- 统计主页：用户总数、累计楼层、累计米数、勋章数量、最近新增用户、最近爬楼记录。
- 勋章配置页：勋章列表、筛选、搜索、编辑弹窗、启停状态。
- 小程序用户信息页：用户列表、分页、搜索、用户累计数据、已解锁勋章数。

### 11.3 后台接口建议

| 接口 | 方法 | 鉴权 | 说明 |
|---|---|---|---|
| /api/admin/auth/login | POST | 否 | 后台管理员登录 |
| /api/admin/auth/me | GET | 是 | 获取当前管理员信息 |
| /api/admin/dashboard/stats | GET | 是 | 统计主页数据 |
| /api/admin/medals | GET | 是 | 勋章配置列表 |
| /api/admin/medals | POST | 是 | 新增勋章 |
| /api/admin/medals/{medalId} | PATCH | 是 | 编辑勋章 |
| /api/admin/medals/{medalId} | DELETE | 是 | 删除勋章 |
| /api/admin/users | GET | 是 | 小程序用户分页列表 |
| /api/admin/users/{userId} | GET | 是 | 小程序用户详情 |

### 11.4 设计理由
- 后台登录和小程序登录分离，避免权限混淆。
- 固定账号能快速满足内部管理需求，不需要额外注册流程。
- 统计页优先展示运营核心指标，便于管理者快速判断活跃度和配置效果。

## 12. 登录鉴权流程

### 11.1 首次登录流程
1. 前端调用 `wx.login` 获取临时 `code`。
2. 前端将 `code` 发送到 `/api/auth/wechat/login`。
3. 后端调用微信 `jscode2session` 接口换取 `openid` 和 `session_key`。
4. 后端按 `openid` 查找用户。
5. 若用户不存在，则创建用户基础档案，标记为未完善资料态。
6. 后端生成 `accessToken` 和 `refreshToken`，保存 refresh token 哈希。
7. 前端保存 token 和基础用户信息，进入首页。

### 11.2 已登录流程
1. 前端启动时先读取本地 `refreshToken` 或 `accessToken`。
2. 若 `accessToken` 有效，直接请求业务接口。
3. 若 `accessToken` 过期，调用 `/api/auth/refresh` 换取新的 token。
4. 若 refresh 失败，则回到登录页重新执行 `wx.login`。

### 11.3 退出登录流程
1. 前端调用 `/api/auth/logout`。
2. 后端将当前 refresh token 标记失效或删除。
3. 前端清空本地 token 和用户缓存。
4. 页面回到未登录态。

### 11.4 接口鉴权规则
- 除登录、刷新 token 外，其余接口默认需要 `Authorization: Bearer <accessToken>`。
- 服务端通过 JWT 守卫解析用户身份。
- 若 token 过期或非法，统一返回未登录错误码。

### 设计理由
- 小程序适合使用 `wx.login + code 换 token` 模式，避免在客户端保存微信敏感密钥。
- access token + refresh token 的组合，兼顾安全性和使用体验。
- refresh token 进入数据库管理后，才能支持主动失效和设备管理。

## 13. 状态流转

### 12.1 首页状态
1. 进入页面，拉取首页数据。
2. 计算当前最高已解锁勋章。
3. 定位勋章墙滚动位置。
4. 若有新增勋章解锁，触发动效和提示。

### 12.2 解锁状态
1. 用户提交新的爬楼数据。
2. 更新累计米数。
3. 对比勋章配置阈值。
4. 生成新增解锁列表。
5. 刷新首页和勋章墙。

## 14. 异常与边界情况
- 用户未登录时，只能看到引导态，不能修改个人资料。
- 勋章配置为空时，首页需要展示空态和后台配置提示。
- 用户累计米数超过最高勋章时，仍展示已完成状态，并保留后续活动扩展空间。
- 勋章图片缺失时，需要降级为默认占位图，避免布局塌陷。

## 15. 性能与体验要求
- 首页首屏内容优先渲染，勋章墙可按需分段加载。
- 动效控制在轻量级，避免影响低端机型流畅度。
- 图片资源需压缩并使用合适尺寸，减少加载等待。

## 16. 交付建议
- 先完成首页、我的页、勋章详情弹窗三大主链路。
- 再补充后台勋章配置和解锁规则管理。
- 最后补强动效和运营活动能力。

## 17. 结论
本实现方案强调“配置驱动 + 强反馈 + 低成本扩展”。首页负责第一眼吸引，勋章墙负责收集动机，弹窗负责解释奖励，动效负责制造惊喜，整体适合微信小程序的轻量、高频、可持续使用场景。

## 18. 代码目录设计

建议采用单仓库前后端分离结构，前端与后端独立部署、独立运行，但共享同一仓库便于联调和版本管理。

```text
gospace/
├─ apps/
│  ├─ mobile/                    # uniapp 微信小程序前端
│  │  ├─ src/
│  │  │  ├─ api/                 # 接口请求封装
│  │  │  ├─ assets/              # 图片、字体、图标
│  │  │  ├─ components/          # 通用组件
│  │  │  ├─ pages/               # 页面文件
│  │  │  │  ├─ index/            # 首页
│  │  │  │  └─ mine/             # 我的页面
│  │  │  ├─ store/               # Pinia 状态管理
│  │  │  ├─ styles/              # 全局样式
│  │  │  ├─ utils/               # 工具函数
│  │  │  └─ types/               # 前端类型定义
│  │  ├─ pages.json
│  │  ├─ manifest.json
│  │  └─ uni.scss
│  └─ server/                    # Node.js 后端
│     ├─ src/
│     │  ├─ modules/             # 业务模块
│     │  │  ├─ auth/             # 登录鉴权
│     │  │  ├─ users/            # 用户资料
│     │  │  ├─ medals/           # 勋章配置与查询
│     │  │  ├─ stair/            # 爬楼数据与统计
│     │  │  └─ common/           # 公共能力
│     │  ├─ schemas/             # MongoDB Schema
│     │  ├─ dto/                 # 请求/响应对象
│     │  ├─ guards/              # JWT 守卫
│     │  ├─ interceptors/        # 响应拦截与日志
│     │  ├─ filters/             # 异常过滤
│     │  ├─ config/              # 配置读取
│     │  ├─ utils/               # 工具方法
│     │  └─ main.ts              # 程序入口
│     ├─ test/
│     └─ package.json
├─ packages/
│  └─ shared/                    # 前后端共享类型、常量、枚举
├─ docs/                         # 需求、PRD、SPEC、接口说明
├─ scripts/                      # 初始化、迁移、部署脚本
└─ .env.example                  # 环境变量示例
```

### 目录设计理由
- apps/mobile 和 apps/server 明确分离，符合前后端分离要求，也方便独立部署。
- packages/shared 存放共享枚举和类型，避免前后端勋章状态、星级枚举不一致。
- docs 独立保存产品和技术文档，便于后续协作与追踪。
- server 按 NestJS 模块拆分，能把登录、用户、勋章、爬楼统计拆清楚，后期扩展活动、排行榜也方便。
