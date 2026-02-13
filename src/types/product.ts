import { Locale } from "./locale";

export interface ProductCategory {
  id: number;
  lang: Locale;
  name: string;
  description: string;
}

export interface Product {
  id: number;
  categoryId: number;
  lang: Locale;
  name: string;
  description: string;
  cover: string;
  heroVideo: string;
  images: string[];
  colorPage: string;
  characteristics: ProductCharacteristic[];
  videos: ProductVideo[];
}

export interface ProductCharacteristic {
  id: number;
  name: string;
}

export interface ProductVideo {
  id: number;
  title: string;
  address: string;
}
