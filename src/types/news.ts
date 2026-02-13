import { Locale } from "./locale";

export interface NewsCategory {
  id: number;
  lang: Locale;
  name: string;
  description: string;
}

export interface News {
  id: number;
  categoryId: number;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  cover: string;
  views: number;
  contentHtml: string;
  related: string[];
  publish: boolean;
  top: boolean;
  tags: Tag[];
  prev: News | null;
  next: News | null;
}

export interface Tag {
  id: number;
  name: string;
}
