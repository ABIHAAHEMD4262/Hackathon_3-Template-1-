export interface Product {
    _id: string;
    name: string;
    _type: "products";
    image?: {
      assets: {
        _ref: string;
        _type: "image";
      };
    };
    price: number;
    description?: string;
    category: string;
    discountPercent: number;
    new: boolean;
    colors: string[]; // Updated to hold an array of strings
    sizes: string[];  // Updated to hold an array of strings
    slug: {
      _type: "slug";
      current: string;
    };
  }
  