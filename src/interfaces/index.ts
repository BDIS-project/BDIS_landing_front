export interface Product {
    upc: number;
    upc_prom?: number;
    id_product: number;
    product_name: string;
    category_name: string;
    picture?: string;
    selling_price: number;  
    original_price?: number;
    products_number: number;
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


export interface CartItem {
  upc: string;
  amount: number;
}


export interface CustomerCard {
    card_number: string,
    cust_surname: string,
    cust_name: string,
    cust_patronymic?: null,
    phone_number: string,
    city?: string,
    street?: string,
    zip_code?: string,
    percent: number
}

export type CustomerCardList = CustomerCard[];


export interface CreateCheckData {
    client: string;
    sold_products: CartItem[];
}