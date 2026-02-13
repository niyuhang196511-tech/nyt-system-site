import { Locale } from "@/types/locale";
import { Timeline } from "@/types/timeline";

export const timeLines: {
  [key in Locale]: Timeline[];
} = {
  "zh-CN": [
    {
      id: 1,
      date: "2015",
      title: "公司成立",
      description:
        "公司正式成立，聚焦医疗器械领域，组建核心研发团队，明确以技术创新为发展方向。",
    },
    {
      id: 2,
      date: "2016",
      title: "核心技术研发启动",
      description:
        "启动核心医疗器械技术研发工作，建立基础实验室，完成多项关键技术验证。",
    },
    {
      id: 3,
      date: "2017",
      title: "产品原型完成",
      description: "首代医疗器械产品原型研发完成，并通过内部功能与安全性测试。",
    },
    {
      id: 4,
      date: "2018",
      title: "技术持续优化",
      description:
        "围绕产品性能、稳定性与临床适配性持续优化设计，完善产品技术路线。",
    },
    {
      id: 5,
      date: "2019",
      title: "临床研究与验证",
      description: "开展多项临床研究与应用验证，为产品注册和合规奠定基础。",
    },
    {
      id: 6,
      date: "2020",
      title: "质量管理体系建设",
      description:
        "引入医疗器械质量管理体系，规范研发流程，全面提升合规与质量控制能力。",
    },
    {
      id: 7,
      date: "2021",
      title: "注册申报准备",
      description: "完成核心产品定型，启动医疗器械注册申报相关准备工作。",
    },
    {
      id: 8,
      date: "2022",
      title: "注册与认证推进",
      description: "推进产品注册、检测与认证流程，为商业化奠定法规基础。",
    },
    {
      id: 9,
      date: "2023",
      title: "商业化筹备",
      description:
        "完成生产规划与市场调研，搭建销售与服务体系，进入商业化准备阶段。",
    },
    {
      id: 10,
      date: "2024",
      title: "转型为生产与销售型企业",
      description:
        "公司正式转型为集研发、生产与销售于一体的医疗器械企业，首款产品上市销售。",
      isCurrent: true,
    },
    {
      id: 11,
      date: "2025",
      title: "市场拓展",
      description:
        "产品进入多个医疗机构，持续拓展市场渠道，品牌影响力稳步提升。",
    },
    // {
    //   id: 12,
    //   date: "2026",
    //   title: "产品线扩展",
    //   description: "在现有产品基础上扩展产品线，持续推动技术创新与市场布局。",
    // },
  ],
  "en-US": [
    {
      id: 1,
      date: "2015",
      title: "Company Founded",
      description:
        "The company was officially established with a focus on the medical device field and the formation of a core R&D team.",
    },
    {
      id: 2,
      date: "2016",
      title: "Core Technology Development Initiated",
      description:
        "Launched the development of core medical device technologies and established foundational laboratory facilities.",
    },
    {
      id: 3,
      date: "2017",
      title: "First Product Prototype Completed",
      description:
        "Completed the first-generation product prototype and conducted internal functionality and safety testing.",
    },
    {
      id: 4,
      date: "2018",
      title: "Technology Optimization",
      description:
        "Continuously optimized product performance, stability, and clinical applicability, refining the overall technical roadmap.",
    },
    {
      id: 5,
      date: "2019",
      title: "Clinical Research and Validation",
      description:
        "Carried out multiple clinical studies and application validations to support future product registration and compliance.",
    },
    {
      id: 6,
      date: "2020",
      title: "Quality Management System Established",
      description:
        "Introduced a medical device quality management system to standardize R&D processes and strengthen compliance and quality control.",
    },
    {
      id: 7,
      date: "2021",
      title: "Regulatory Preparation",
      description:
        "Finalized core product design and initiated preparations for medical device regulatory submissions.",
    },
    {
      id: 8,
      date: "2022",
      title: "Regulatory Approval Progress",
      description:
        "Advanced product registration, testing, and certification processes, laying the regulatory foundation for commercialization.",
    },
    {
      id: 9,
      date: "2023",
      title: "Commercialization Preparation",
      description:
        "Completed production planning and market research, and began building sales and service capabilities.",
    },
    {
      id: 10,
      date: "2024",
      title: "Transition to Manufacturing and Sales",
      description:
        "The company officially transitioned into an integrated medical device enterprise covering R&D, manufacturing, and sales, with the first product launched to market.",
      isCurrent: true,
    },
    {
      id: 11,
      date: "2025",
      title: "Market Expansion",
      description:
        "Expanded market presence across medical institutions and continued to strengthen distribution channels and brand recognition.",
    },
    // {
    //   id: 12,
    //   date: "2026",
    //   title: "Product Portfolio Expansion",
    //   description:
    //     "Expanded the product portfolio based on existing technologies, driving continuous innovation and broader market coverage.",
    // },
  ],
};
