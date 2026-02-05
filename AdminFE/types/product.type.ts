

export enum ProductGender {
  MALE = "Male",
  FEMALE = "Female",
  UNISEX = "Unisex",
}



export interface ICategory {
  _id: string;
  name: string;
  image: string;
  slug: string;
}

export interface IProduct {
  _id: string;
  name: string;
  categories: (string | ICategory)[];
  colors: string[];
  types: string[];
  gender: ProductGender;
  images: string[];
  new: boolean;
  price: number;
  discountPrice: number;
  quantity: number;
  description: string[];
  instructions: string[];
  reviews: string[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
  __v?: string;
}
