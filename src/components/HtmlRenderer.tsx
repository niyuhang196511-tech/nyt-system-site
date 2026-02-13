import parse, { DOMNode, Element } from "html-react-parser";

interface HtmlRendererProps {
  html: string;
}

export function HtmlRenderer({ html }: HtmlRendererProps) {
  const options = {
    replace(domNode: DOMNode) {
      if (domNode instanceof Element) {
        /** 图片：飞书风（无阴影、轻圆角） */
        if (domNode.name === "img") {
          const { src, alt, ...data } = domNode.attribs;

          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt ?? ""}
              className="my-6 max-w-full rounded-lg"
              loading="lazy"
              {...data}
            />
          );
        }

        /** 视频：等比、克制 */
        if (domNode.name === "video") {
          const { src, poster } = domNode.attribs;

          return (
            <video
              controls
              poster={poster}
              src={src}
              className="my-6 w-full rounded-lg bg-black"
            />
          );
        }

        /** iframe（飞书嵌入风） */
        if (domNode.name === "iframe") {
          return (
            <div className="my-6 aspect-video overflow-hidden rounded-lg">
              <iframe
                {...domNode.attribs}
                className="h-full w-full"
                allowFullScreen
              />
            </div>
          );
        }
      }
    },
  };

  return (
    <article className="/* 全局排版 */ /* 标题（飞书风：克制、无装饰） */ /* 链接 */ /* 强调 */ /* 列表（飞书列表很紧凑） */ /* 引用（淡灰线） */ /* 表格（飞书重点） */ /* 行内代码（飞书风） */ /* 代码块 */ prose max-w-none prose-zinc prose-h1:mb-6 prose-h1:text-3xl prose-h1:font-semibold prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-2xl prose-h2:font-semibold prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl prose-h3:font-medium prose-p:my-3 prose-p:leading-7 prose-p:text-zinc-700 prose-a:text-blue-600 hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-zinc-300 prose-blockquote:bg-transparent prose-blockquote:py-1 prose-blockquote:pl-4 prose-blockquote:text-zinc-600 prose-strong:text-zinc-900 prose-code:rounded prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-zinc-800 prose-pre:my-6 prose-pre:rounded-lg prose-pre:bg-zinc-900 prose-pre:p-4 prose-pre:text-zinc-100 prose-ol:pl-6 prose-ul:pl-6 prose-li:my-1.5 prose-table:my-6 prose-th:border prose-th:border-zinc-300 prose-th:bg-zinc-50 prose-th:px-3 prose-th:py-2 prose-th:font-medium prose-th:text-zinc-700 prose-td:border prose-td:border-zinc-200 prose-td:px-3 prose-td:py-2 prose-td:text-zinc-700">
      {parse(html, options)}
    </article>
  );
}

export default HtmlRenderer;
