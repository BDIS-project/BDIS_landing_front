export interface Product {
    upc: number;
    upc_prom?: number;
    id_product: number;
    product_name: string;
    category_name: string;
    //image: string;
    selling_price: number;  
    original_price?: number;
    products_number: number;
    //rating: number;
    promotional_product: boolean;
    expire_date: string;
}

export type ProductList = Product[];

export interface Category {
    category_number: number;
    category_name: string;
}

export type CategoryList = Category[];

export interface QueryParams {
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    categories?: string;
    inStock?: string;
    sort?: string;
  }

