import { StrapiImage } from "./product";


export interface Category {
  id: number;
  name: string;
  documentId: string;
  image: StrapiImage[];
}

export interface HomeSection {
  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: StrapiImage;
}

export interface RawStrapiHomeSection {
  id: number;
  attributes: {
    documentId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image: {
      data: {
        id: number;
        attributes: StrapiImage;
      };
    };
  };
}

export interface HomePageResponse {
  data: RawStrapiHomeSection[];
}
