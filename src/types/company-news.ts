import { Locale } from "./locale";

export interface CompanyNews {
  id: number;
  lang: Locale;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  cover: string;
  contentHtml: string;
  top: 0 | 1;
  prev?: CompanyNews;
  next?: CompanyNews;
}
