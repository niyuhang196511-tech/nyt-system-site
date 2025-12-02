# MediTech Global - Next.js App Router Prototype

这是为医疗器械公司设计的 Next.js (app-router) 原型，内置多语言/国家化（en / zh-CN / fr）、响应式布局与示例页面，包含：

-   首页、产品页、产品详情页、新闻列表、新闻详情、关于我们、联系我们
-   国际化路由：/en, /zh-CN, /fr
-   中间件会根据浏览器首选语言自动重定向到对应 locale
-   Tailwind CSS + 基础品牌样式

启动步骤（示例）：

1. 初始化项目并安装依赖（Next.js 13+ / Tailwind）：
    - yarn create next-app --experimental-app
    - 或使用 npm init
2. 安装 Tailwind:
    - yarn add -D tailwindcss postcss autoprefixer
    - npx tailwindcss init -p
3. 将本仓库文件放入项目对应位置（app、components、locales、middleware.ts 等）
4. 运行：
    - yarn dev 或 npm run dev

后续建议：

-   将 mock 数据替换为真实 API（products/news）
-   国际化：使用 next-intl / react-intl 进行丰富的翻译、日期/货币格式化
-   为不同国家提供合规页（法规、证书、资质）和国家化联系方式
-   SEO：为每个 locale 生成 hreflang、sitemap、多语言 meta
-   性能：图片使用 next/image、开启 ISR 或 SSG（根据产品和新闻）
-   可增加 A/B 测试、多语言版本的审计/翻译工作流（Crowdin、Transifex）

如果你希望我把这些文件直接打包成 GitHub 仓库并为你创建初始 PR，我可以继续（需要你提供目标仓库信息）。若要我改用 next-intl 或加入真实 API 示例、或把语言切换深度改为保留路径（在 ProductCard/NewsCard 中动态生成 locale 链接），告诉我你的优先项，我会接着实现。
