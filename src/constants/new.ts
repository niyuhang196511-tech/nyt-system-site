import { News } from "@/types/news";
import { Locale } from "next-intl";

export const newCategoriesConstants = {
  "zh-CN": [
    {
      id: 1,
      name: "行业公告与发布",
      description:
        "面向监管机构发布的最新公告、通知与行业动态，及时呈现政策变动与关键要求。帮助企业快速获取权威信息，明确合规方向。",
    },
    {
      id: 2,
      name: "法规标准与文件",
      description:
        "收录国家及行业层面的医疗器械法规、技术标准、指导原则等文件。为研发、生产与注册提供权威依据，支持企业合规化运营。",
    },
    {
      id: 3,
      name: "政策解读与行业洞察",
      description:
        "结合政策发布，提供专业解读与趋势分析。以简明视角帮助企业理解政策影响，洞察行业发展方向与合规重点。",
    },
    {
      id: 4,
      name: "集采动态与中标资讯",
      description:
        "关注国家及地方医疗器械集中采购信息、中标结果及最新采购政策。为企业提供市场变化参考，助力决策与投标工作。",
    },
    {
      id: 5,
      name: "医保与收费目录",
      description:
        "展示医保相关政策、收费目录更新和支付标准。帮助企业理解产品纳入医保后的流程与影响，为市场准入提供参考依据。",
    },
  ],
  "en-US": [
    {
      id: 1,
      name: "Regulatory Announcements",
      description:
        "Provides timely updates on official notices, regulatory bulletins, and industry announcements issued by authorities. Helps organizations stay aligned with the latest compliance requirements and policy changes.",
    },
    {
      id: 2,
      name: "Regulations & Standards",
      description:
        "Includes national and industry-level regulations, technical standards, and guidance documents for medical devices. Serves as a reliable reference for R&D, manufacturing, and regulatory teams to ensure full compliance.",
    },
    {
      id: 3,
      name: "Policy Insights & Industry Analysis",
      description:
        "Offers professional interpretations of newly released policies along with in-depth industry insights. Helps companies understand policy impacts, identify key trends, and navigate the evolving regulatory landscape.",
    },
    {
      id: 4,
      name: "Procurement Updates & Tender Results",
      description:
        "Covers centralized procurement announcements, bidding results, and procurement-related policy updates. Supports businesses in tracking market opportunities and preparing for tender participation with up-to-date information.",
    },
    {
      id: 5,
      name: "Reimbursement Policies & Fee Schedules",
      description:
        "Provides updates on reimbursement policies, fee schedule changes, and medical insurance inclusion guidelines. Helps companies understand market access requirements and the financial implications of product reimbursement.",
    },
  ],
};

export const newsConstants: {
  [key in Locale]: News[];
} = {
  "zh-CN": [
    {
      id: 1,
      categoryId: 1,
      title: "新公司成功举办2024年医疗器械展览会",
      subject: "行业活动",
      date: "2024-05-15",
      author: "Nyh",
      views: 256,
      tags: ["展览会", "医疗器械", "行业"],
      cover: "/images/message-banner.webp",
      contentHtml:
        "<p>2024年5月10日至5月12日，我公司成功参加了在国家会展中心（上海）举办的2024年医疗器械展览会。展会期间，我们展示了最新的医疗器械产品和技术，吸引了众多行业专业人士和参观者的关注。</p><p>在展位上，我们的专业团队详细介绍并演示了产品，使参观者能够更深入地了解我们的技术创新和临床应用。我们还与行业专家和潜在合作伙伴进行了深入交流，探讨未来合作的可能性。</p><p>此次展会不仅提升了我公司在医疗器械行业的品牌影响力，也加强了与行业同仁的联系。我们将继续秉持创新与质量的承诺，为医疗界提供更优质的产品和服务。</p>",
      related: ["2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      id: 2,
      categoryId: 2,
      views: 256,
      title: "新产品获得国家医疗器械注册证",
      subject: "产品新闻",
      date: "2024-04-10",
      author: "Nyh",
      tags: ["新产品", "医疗器械", "认证"],
      cover: "/images/message-banner.webp",
      contentHtml:
        "<p>我公司新研发的一次性使用包皮切割吻合器成功获得了国家医疗器械注册证，这标志着公司在创新医疗器械领域迈出了重要一步。</p><p>该产品旨在替代传统的手工缝合方法，为包皮环切手术提供一种更高效、更可靠的解决方案。该吻合器通过内置的环形刀和吻合钉，在切除多余包皮的同时，自动完成吻合操作，确保吻合口紧密且松紧适中，减少术后并发症的发生。</p><p>该产品的成功注册不仅展示了我公司强大的研发能力，也体现了我们致力于提供高质量、满足临床需求的医疗器械的承诺。我们将继续专注于创新与质量，努力为医疗服务提供者和患者带来更多先进的医疗解决方案。</p>",
      related: ["2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      id: 3,
      categoryId: 3,
      title: "与知名医院达成战略合作",
      subject: "合作伙伴",
      date: "2024-03-20",
      author: "Nyh",
      views: 256,
      cover: "/images/message-banner.webp",
      tags: ["合作", "医院", "医疗器械"],
      contentHtml:
        "<p>2024年5月10日至5月12日，我公司成功参加了在国家会展中心（上海）举办的2024年医疗器械展览会。展会期间，我们展示了最新的医疗器械产品和技术，吸引了众多行业专业人士和参观者的关注。</p><p>在展位上，我们的专业团队详细介绍并演示了产品，使参观者能够更深入地了解我们的技术创新和临床应用。我们还与行业专家和潜在合作伙伴进行了深入交流，探讨未来合作的可能性。</p><p>此次展会不仅提升了我公司在医疗器械行业的品牌影响力，也加强了与行业同仁的联系。我们将继续秉持创新与质量的承诺，为医疗界提供更优质的产品和服务。</p>",
      related: ["2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      id: 4,
      categoryId: 4,
      title: "公司成功举办2024年医疗器械展览会",
      subject: "行业活动",
      date: "2024-05-15",
      author: "Nyh",
      views: 256,
      tags: ["展览会", "医疗器械", "行业"],
      cover: "/images/message-banner.webp",
      contentHtml:
        "<p>2024年5月10日至5月12日，我公司成功参加了在国家会展中心（上海）举办的2024年医疗器械展览会。展会期间，我们展示了最新的医疗器械产品和技术，吸引了众多行业专业人士和参观者的关注。</p><p>在展位上，我们的专业团队详细介绍并演示了产品，使参观者能够更深入地了解我们的技术创新和临床应用。我们还与行业专家和潜在合作伙伴进行了深入交流，探讨未来合作的可能性。</p><p>此次展会不仅提升了我公司在医疗器械行业的品牌影响力，也加强了与行业同仁的联系。我们将继续秉持创新与质量的承诺，为医疗界提供更优质的产品和服务。</p>",
      related: ["2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      id: 5,
      categoryId: 5,
      views: 256,
      title: "新产品获得国家医疗器械注册证",
      subject: "产品新闻",
      date: "2024-04-10",
      author: "Nyh",
      tags: ["新产品", "医疗器械", "认证"],
      cover: "/images/message-banner.webp",
      contentHtml:
        "<p>Our newly developed disposable foreskin cutting stapler successfully obtained the national medical device registration certificate, marking an important step forward for the company in the field of innovative medical devices.</p><p>This product is designed to replace traditional manual suturing methods, providing a more efficient and reliable solution for circumcision procedures. The stapler utilizes a built-in circular knife and anastomotic nails to automatically complete the anastomosis while removing excess foreskin, ensuring a tight and secure closure that reduces postoperative complications.</p><p>The successful registration of this product not only demonstrates our company's strong R&D capabilities but also reflects our commitment to providing high-quality medical devices that meet clinical needs. We will continue to focus on innovation and quality, striving to bring more advanced medical solutions to healthcare providers and patients.</p>",
      related: ["2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      id: 6,
      categoryId: 1,
      title: "与知名医院达成战略合作",
      subject: "合作伙伴",
      date: "2024-03-20",
      author: "Nyh",
      views: 256,
      cover: "/images/message-banner.webp",
      tags: ["合作", "医院", "医疗器械"],
      contentHtml:
        "<p>2024年5月10日至5月12日，我公司成功参加了在国家会展中心（上海）举办的2024年医疗器械展览会。展会期间，我们展示了最新的医疗器械产品和技术，吸引了众多行业专业人士和参观者的关注。</p><p>在展位上，我们的专业团队详细介绍并演示了产品，使参观者能够更深入地了解我们的技术创新和临床应用。我们还与行业专家和潜在合作伙伴进行了深入交流，探讨未来合作的可能性。</p><p>此次展会不仅提升了我公司在医疗器械行业的品牌影响力，也加强了与行业同仁的联系。我们将继续秉持创新与质量的承诺，为医疗界提供更优质的产品和服务。</p>",
      related: ["2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      id: 7,
      categoryId: 2,
      title: "公司成功举办2024年医疗器械展览会",
      subject: "行业活动",
      date: "2024-05-15",
      author: "Nyh",
      views: 256,
      tags: ["展览会", "医疗器械", "行业"],
      cover: "/images/message-banner.webp",
      contentHtml:
        "<p>From May 10 to May 12, 2024, our company successfully participated in the 2024 Medical Device Exhibition held at the National Convention and Exhibition Center (Shanghai). During the exhibition, we showcased our latest medical device products and technologies, attracting widespread attention from industry professionals and visitors.</p><p>At the exhibition booth, our professional team provided detailed explanations and demonstrations of our products, allowing visitors to gain a deeper understanding of our technological innovations and clinical applications. We also engaged in in-depth discussions with industry experts and potential partners, exploring opportunities for future collaboration.</p><p>This exhibition not only enhanced our company's brand influence in the medical device industry but also strengthened our connections with industry peers. We will continue to uphold our commitment to innovation and quality, providing better products and services to the medical community.</p>",
      related: ["2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      id: 8,
      categoryId: 3,
      views: 256,
      title: "新产品获得国家医疗器械注册证",
      subject: "产品新闻",
      date: "2024-04-10",
      author: "Nyh",
      tags: ["新产品", "医疗器械", "认证"],
      cover: "/images/message-banner.webp",
      contentHtml:
        "<p>Our newly developed disposable foreskin cutting stapler successfully obtained the national medical device registration certificate, marking an important step forward for the company in the field of innovative medical devices.</p><p>This product is designed to replace traditional manual suturing methods, providing a more efficient and reliable solution for circumcision procedures. The stapler utilizes a built-in circular knife and anastomotic nails to automatically complete the anastomosis while removing excess foreskin, ensuring a tight and secure closure that reduces postoperative complications.</p><p>The successful registration of this product not only demonstrates our company's strong R&D capabilities but also reflects our commitment to providing high-quality medical devices that meet clinical needs. We will continue to focus on innovation and quality, striving to bring more advanced medical solutions to healthcare providers and patients.</p>",
      related: ["2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      id: 9,
      categoryId: 1,
      title: "与知名医院达成战略合作",
      subject: "合作伙伴",
      date: "2024-03-20",
      author: "Nyh",
      views: 256,
      cover: "/images/message-banner.webp",
      tags: ["合作", "医院", "医疗器械"],
      contentHtml:
        "<p>From May 10 to May 12, 2024, our company successfully participated in the 2024 Medical Device Exhibition held at the National Convention and Exhibition Center (Shanghai). During the exhibition, we showcased our latest medical device products and technologies, attracting widespread attention from industry professionals and visitors.</p><p>At the exhibition booth, our professional team provided detailed explanations and demonstrations of our products, allowing visitors to gain a deeper understanding of our technological innovations and clinical applications. We also engaged in in-depth discussions with industry experts and potential partners, exploring opportunities for future collaboration.</p><p>This exhibition not only enhanced our company's brand influence in the medical device industry but also strengthened our connections with industry peers. We will continue to uphold our commitment to innovation and quality, providing better products and services to the medical community.</p>",
      related: ["2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
  ],
  en: [
    {
      id: 1,
      categoryId: 1,
      title: "The company successfully held the 2024 Medical Device Exhibition",
      subject: "Industry Event",
      date: "2024-05-15",
      author: "Nyh",
      views: 256,
      tags: ["Exhibition", "Medical Devices", "Industry"],
      cover: "/images/message-banner.webp",
      contentHtml:
        "<p>From May 10 to May 12, 2024, our company successfully participated in the 2024 Medical Device Exhibition held at the National Convention and Exhibition Center (Shanghai). During the exhibition, we showcased our latest medical device products and technologies, attracting widespread attention from industry professionals and visitors.</p><p>At the exhibition booth, our professional team provided detailed explanations and demonstrations of our products, allowing visitors to gain a deeper understanding of our technological innovations and clinical applications. We also engaged in in-depth discussions with industry experts and potential partners, exploring opportunities for future collaboration.</p><p>This exhibition not only enhanced our company's brand influence in the medical device industry but also strengthened our connections with industry peers. We will continue to uphold our commitment to innovation and quality, providing better products and services to the medical community.</p>",
      related: ["2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      id: 2,
      categoryId: 2,
      views: 256,
      title:
        "New product obtained national medical device registration certificate",
      subject: "Product News",
      date: "2024-04-10",
      author: "Nyh",
      tags: ["New Product", "Medical Device", "Certification"],
      cover: "/images/message-banner.webp",
      contentHtml:
        "<p>Our newly developed disposable foreskin cutting stapler successfully obtained the national medical device registration certificate, marking an important step forward for the company in the field of innovative medical devices.</p><p>This product is designed to replace traditional manual suturing methods, providing a more efficient and reliable solution for circumcision procedures. The stapler utilizes a built-in circular knife and anastomotic nails to automatically complete the anastomosis while removing excess foreskin, ensuring a tight and secure closure that reduces postoperative complications.</p><p>The successful registration of this product not only demonstrates our company's strong R&D capabilities but also reflects our commitment to providing high-quality medical devices that meet clinical needs. We will continue to focus on innovation and quality, striving to bring more advanced medical solutions to healthcare providers and patients.</p>",
      related: ["1", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      id: 3,
      categoryId: 3,
      title: "Strategic cooperation reached with well-known hospitals",
      subject: "Partnerships",
      date: "2024-03-20",
      author: "Nyh",
      views: 256,
      cover: "/images/message-banner.webp",
      tags: ["Cooperation", "Hospitals", "Medical Devices"],
      contentHtml:
        "<p>From May 10 to May 12, 2024, our company successfully participated in the 2024 Medical Device Exhibition held at the National Convention and Exhibition Center (Shanghai). During the exhibition, we showcased our latest medical device products and technologies, attracting widespread attention from industry professionals and visitors.</p><p>At the exhibition booth, our professional team provided detailed explanations and demonstrations of our products, allowing visitors to gain a deeper understanding of our technological innovations and clinical applications. We also engaged in in-depth discussions with industry experts and potential partners, exploring opportunities for future collaboration.</p><p>This exhibition not only enhanced our company's brand influence in the medical device industry but also strengthened our connections with industry peers. We will continue to uphold our commitment to innovation and quality, providing better products and services to the medical community.</p>",
      related: ["2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      id: 4,
      categoryId: 4,
      title: "The company successfully held the 2024 Medical Device Exhibition",
      subject: "Industry Event",
      date: "2024-05-15",
      author: "Nyh",
      views: 256,
      tags: ["Exhibition", "Medical Devices", "Industry"],
      cover: "/images/message-banner.webp",
      contentHtml:
        "<p>From May 10 to May 12, 2024, our company successfully participated in the 2024 Medical Device Exhibition held at the National Convention and Exhibition Center (Shanghai). During the exhibition, we showcased our latest medical device products and technologies, attracting widespread attention from industry professionals and visitors.</p><p>At the exhibition booth, our professional team provided detailed explanations and demonstrations of our products, allowing visitors to gain a deeper understanding of our technological innovations and clinical applications. We also engaged in in-depth discussions with industry experts and potential partners, exploring opportunities for future collaboration.</p><p>This exhibition not only enhanced our company's brand influence in the medical device industry but also strengthened our connections with industry peers. We will continue to uphold our commitment to innovation and quality, providing better products and services to the medical community.</p>",
      related: ["2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      id: 5,
      categoryId: 5,
      views: 256,
      title:
        "New product obtained national medical device registration certificate",
      subject: "Product News",
      date: "2024-04-10",
      author: "Nyh",
      tags: ["New Product", "Medical Device", "Certification"],
      cover: "/images/message-banner.webp",
      contentHtml:
        "<p>Our newly developed disposable foreskin cutting stapler successfully obtained the national medical device registration certificate, marking an important step forward for the company in the field of innovative medical devices.</p><p>This product is designed to replace traditional manual suturing methods, providing a more efficient and reliable solution for circumcision procedures. The stapler utilizes a built-in circular knife and anastomotic nails to automatically complete the anastomosis while removing excess foreskin, ensuring a tight and secure closure that reduces postoperative complications.</p><p>The successful registration of this product not only demonstrates our company's strong R&D capabilities but also reflects our commitment to providing high-quality medical devices that meet clinical needs. We will continue to focus on innovation and quality, striving to bring more advanced medical solutions to healthcare providers and patients.</p>",
      related: ["2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      id: 6,
      categoryId: 1,
      title: "Strategic cooperation reached with well-known hospitals",
      subject: "Partnerships",
      date: "2024-03-20",
      author: "Nyh",
      views: 256,
      cover: "/images/message-banner.webp",
      tags: ["Cooperation", "Hospitals", "Medical Devices"],
      contentHtml:
        "<p>From May 10 to May 12, 2024, our company successfully participated in the 2024 Medical Device Exhibition held at the National Convention and Exhibition Center (Shanghai). During the exhibition, we showcased our latest medical device products and technologies, attracting widespread attention from industry professionals and visitors.</p><p>At the exhibition booth, our professional team provided detailed explanations and demonstrations of our products, allowing visitors to gain a deeper understanding of our technological innovations and clinical applications. We also engaged in in-depth discussions with industry experts and potential partners, exploring opportunities for future collaboration.</p><p>This exhibition not only enhanced our company's brand influence in the medical device industry but also strengthened our connections with industry peers. We will continue to uphold our commitment to innovation and quality, providing better products and services to the medical community.</p>",
      related: ["2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      id: 7,
      categoryId: 2,
      title: "The company successfully held the 2024 Medical Device Exhibition",
      subject: "Industry Event",
      date: "2024-05-15",
      author: "Nyh",
      views: 256,
      tags: ["Exhibition", "Medical Devices", "Industry"],
      cover: "/images/message-banner.webp",
      contentHtml:
        "<p>From May 10 to May 12, 2024, our company successfully participated in the 2024 Medical Device Exhibition held at the National Convention and Exhibition Center (Shanghai). During the exhibition, we showcased our latest medical device products and technologies, attracting widespread attention from industry professionals and visitors.</p><p>At the exhibition booth, our professional team provided detailed explanations and demonstrations of our products, allowing visitors to gain a deeper understanding of our technological innovations and clinical applications. We also engaged in in-depth discussions with industry experts and potential partners, exploring opportunities for future collaboration.</p><p>This exhibition not only enhanced our company's brand influence in the medical device industry but also strengthened our connections with industry peers. We will continue to uphold our commitment to innovation and quality, providing better products and services to the medical community.</p>",
      related: ["2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      id: 8,
      categoryId: 3,
      views: 256,
      title:
        "New product obtained national medical device registration certificate",
      subject: "Product News",
      date: "2024-04-10",
      author: "Nyh",
      tags: ["New Product", "Medical Device", "Certification"],
      cover: "/images/message-banner.webp",
      contentHtml:
        "<p>Our newly developed disposable foreskin cutting stapler successfully obtained the national medical device registration certificate, marking an important step forward for the company in the field of innovative medical devices.</p><p>This product is designed to replace traditional manual suturing methods, providing a more efficient and reliable solution for circumcision procedures. The stapler utilizes a built-in circular knife and anastomotic nails to automatically complete the anastomosis while removing excess foreskin, ensuring a tight and secure closure that reduces postoperative complications.</p><p>The successful registration of this product not only demonstrates our company's strong R&D capabilities but also reflects our commitment to providing high-quality medical devices that meet clinical needs. We will continue to focus on innovation and quality, striving to bring more advanced medical solutions to healthcare providers and patients.</p>",
      related: ["2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      id: 9,
      categoryId: 1,
      title: "Strategic cooperation reached with well-known hospitals",
      subject: "Partnerships",
      date: "2024-03-20",
      author: "Nyh",
      views: 256,
      cover: "/images/message-banner.webp",
      tags: ["Cooperation", "Hospitals", "Medical Devices"],
      contentHtml:
        "<p>From May 10 to May 12, 2024, our company successfully participated in the 2024 Medical Device Exhibition held at the National Convention and Exhibition Center (Shanghai). During the exhibition, we showcased our latest medical device products and technologies, attracting widespread attention from industry professionals and visitors.</p><p>At the exhibition booth, our professional team provided detailed explanations and demonstrations of our products, allowing visitors to gain a deeper understanding of our technological innovations and clinical applications. We also engaged in in-depth discussions with industry experts and potential partners, exploring opportunities for future collaboration.</p><p>This exhibition not only enhanced our company's brand influence in the medical device industry but also strengthened our connections with industry peers. We will continue to uphold our commitment to innovation and quality, providing better products and services to the medical community.</p>",
      related: ["2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
  ],
};

export const PAGE_SIZE = 10;

export const SEARCH_DEBOUNCE = 350; // ms
