export interface IGalleryItem {
  _id?: string;
  description: string;
  name: string;
  categoryId?: string;
  images: string[];
  show: boolean;
}
