// import { Strength } from "@/types/strength";
// import Image from "next/image";

// interface IProps {
//   title: string;
//   descriptions: string[];
//   strengths: Strength[];
// }

// export default function CompanyIntroduce({
//   title,
//   descriptions: description,
//   strengths: strength,
// }: IProps) {
//   return (
//     <section>
//       <div className="container mx-auto px-4 py-6">
//         <div className="mb-12 sm:mb-16">
//           <h1 className="mb-2 text-center text-xl font-bold text-foreground sm:text-4xl md:mb-4 md:text-2xl xl:mb-6 xl:text-3xl">
//             {title}
//           </h1>

//           <div className="mx-auto max-w-4xl">
//             {description.map((paragraph, index) => (
//               <p className="mb-5 indent-8 leading-7 md:leading-9" key={index}>
//                 {paragraph}
//               </p>
//             ))}
//           </div>
//         </div>

//         <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
//           {strength.map((strength) => (
//             <div
//               key={strength.description}
//               className="flex flex-col items-center gap-3 py-6"
//               style={{
//                 boxShadow: "0 1px 0 rgba(171, 171, 171, 0.4)",
//               }}
//             >
//               <div className="grid min-w-48 grid-cols-2 items-center justify-center">
//                 <Image
//                   src={strength.icon}
//                   alt={strength.description}
//                   width={50}
//                   height={50}
//                   className="icon-sm"
//                 />
//                 <span className="card-text text-2xl font-semibold text-foreground">
//                   {strength.quantity}
//                   {strength.unit}
//                 </span>
//               </div>
//               <div className="card-text text-lg text-foreground sm:text-2xl">
//                 {strength.description}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import { Strength } from "@/types/strength";
import Image from "next/image";

interface IProps {
  title: string;
  descriptions: string[];
  strengths: Strength[];
}

export default function CompanyIntroduce({
  title,
  descriptions,
  strengths,
}: IProps) {
  return (
    <section className="">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 xl:grid-cols-2">
        {/* 左侧介绍 */}
        <div>
          <h1 className="mb-6 text-center text-2xl font-bold text-foreground md:text-3xl xl:text-4xl">
            {title}
          </h1>

          <div className="space-y-5 text-muted-foreground">
            {descriptions.map((paragraph, index) => (
              <p
                key={index}
                className="indent-8 leading-7 break-all md:leading-8"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* 右侧数据 */}
        <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {strengths.map((item, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center justify-between overflow-hidden rounded-4xl border border-slate-100 bg-white p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 md:hover:-translate-y-3"
            >
              {/* 1. 增强背景装饰：移动端可见，PC端悬浮放大 */}
              <div className="absolute -top-6 -right-6 h-28 w-28 rounded-full bg-linear-to-br from-primary/10 to-transparent transition-transform duration-700 group-hover:scale-150" />

              <div className="relative z-10 flex h-full w-full flex-col items-center justify-around">
                {/* 2. 图标容器：增加轻微投影，防止在移动端显得扁平 */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 shadow-inner transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                  <Image
                    src={item.icon}
                    alt={item.description}
                    width={36}
                    height={36}
                    className="transition-all duration-300 group-hover:scale-110 group-hover:brightness-0 group-hover:invert"
                  />
                </div>

                {/* 3. 数据展示：解决英文单位或长数字挤压 */}
                <div className="flex w-full flex-wrap items-baseline justify-center gap-1">
                  <span className="text-4xl font-extrabold tracking-tighter text-slate-900 tabular-nums md:text-5xl">
                    {item.quantity}
                  </span>
                  <span className="text-lg font-bold text-primary italic">
                    {item.unit}
                  </span>
                </div>

                {/* 4. 文本区域：彻底解决长文本/多语言溢出 */}
                <div className="mt-5 flex min-h-18 w-full flex-col items-center justify-center">
                  {/* 中文描述 */}
                  <p className="text-base leading-tight font-bold text-slate-700">
                    {item.description}
                  </p>

                  {/* 英文描述：通过 leading-tight 和 max-w 确保长单词自动换行而不溢出 */}
                  <p className="mt-2 max-w-[180px] text-[11px] leading-tight font-medium tracking-wider wrap-break-word text-slate-400 uppercase opacity-80 transition-opacity group-hover:opacity-100">
                    {item.description || "Global Medical Excellence"}
                  </p>
                </div>
              </div>

              {/* 5. 移动端细节：底部品牌色进度条装饰 */}
              <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
