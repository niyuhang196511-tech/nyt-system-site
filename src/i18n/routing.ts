import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en-US", "zh-CN"],
  defaultLocale: "zh-CN",
  pathnames: {
    "/": "/",
    "/pathnames": {
      "en-US": "/pathnames",
      "zh-CN": "/路径名",
    },
  },
});
