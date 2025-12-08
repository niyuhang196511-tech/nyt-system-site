# MediTech Global - Next.js App Router Prototype

Next.js (App Router) + Tailwind + react-three-fiber 3D Viewer（含 Draco 压缩支持）

目标

- 使用 Next.js App Router（app/）
- 使用 Tailwind CSS 做简单样式
- 使用 @react-three/fiber + @react-three/drei 渲染 3D 模型
- 支持 Draco 压缩文件并在浏览器端解码（DRACOLoader）

快速开始（从零到一）

1. 克隆并进入项目
   git clone <repo>
   cd <repo>

2. 安装依赖（postinstall 会尝试复制 Draco 解码器到 public/draco）
   npm install

3. 准备模型
   - 把你的原始 GLB 放在 public/models/scene.glb
   - 运行 Draco 压缩（推荐 gltf-transform）
     npx @gltf-transform/cli draco public/models/scene.glb public/models/scene.draco.glb --encoder-method=edgebreaker --quantization=14
     （或使用 package.json 的脚本：npm run compress:gltf-transform）
   - 确保 public/draco 中有解码器文件（postinstall 脚本会尝试复制它们）

4. 启动开发服务器
   npm run dev
   打开 http://localhost:3000

技术细节要点（我已经为你完成）

- App Router: 我把入口放在 app/layout.tsx 和 app/page.tsx，并在 layout 引入全局样式。
- Client component: components/ModelViewer.tsx 标记为 'use client'，因为 three.js 只在浏览器中可用。
- DRACO: ModelViewer 里使用 three/examples 的 DRACOLoader，并把解码器路径设置为 '/draco/'。scripts/copy-draco.js 会在 postinstall 时把解码器复制到 public/draco（如无法复制请手动复制）。
- 模型自动 fit: ModelViewer 会在加载后计算包围盒并尽可能将模型缩放到可视范围内。
- 压缩建议: 推荐使用 @gltf-transform/cli 的 draco 命令或 gltfpack，两者都能显著减小模型体积。

进一步改进建议（后续迭代思路）

- Draco + KTX2 / Basis universal 纹理压缩（通过 ktx2 / basis 转换纹理）可以更进一步减小纹理体积并提升 GPU 上传速度。
- LOD 管理：对复杂模型生成多级 LOD，并根据相机距离切换。
- 进阶加载策略：使用 Streaming / range requests、或者展示低分辨率占位图（SSR 可用的缩略图）。
- 导出截图、模型配置（旋转/缩放/材质切换）、以及选中和高亮交互。
- 性能：限制 renderer.setPixelRatio、使用浅色/简单着色器、剔除不可见网格、合并/实例化重复网格。

如果你要我接下来做的事（我可以立刻在同一轮给出实现）：

- 把 draco 解码器复制脚本改为更健壮（Windows / CI 兼容），或在构建中验证解码器存在。
- 添加一个可选 UI：上传模型 -> 自动压缩（调用远端服务或在本地执行 CLI）-> 展示。
- 添加纹理 KTX2 转换示例（使用 @gltf-transform/cli ktx2）并在客户端使用 KTX2 Loader。
  选择一个目标我会直接给出相应的代码/脚本/步骤。
