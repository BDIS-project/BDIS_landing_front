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


export interface CreateCheckData {
    client: string;
    sold_products: CartItem[];
}


export interface Check {
    check_number: string;
    id_employee: string;
    card_number?: string;
    print_date: string
    sum_total: number
    vat: number
  }
  
export type CheckList = Check[];

export interface CustomerCard {
    card_number: string;
    cust_surname: string;
    cust_name: string;
    cust_patronymic?: string;
    phone_number: string;
    city?: string;
    street?: string;
    zip_code?: string;
    percent: number;
}

export type CustomerCardList = CustomerCard[];

export interface PostCustomerCard {
    'card-number': string;
    surname: string;
    name: string;
    patronymic?: string;
    phone: string;
    city?: string;
    street?: string;
    'zip-code'?: string;
    percent: number;
}

export interface Employee {
    id_employee: string;
    empl_surname: string;
    empl_name: string;
    empl_patronymic?: string;
    empl_role: string;
    salary: number;
    date_of_birth: string;
    date_of_start: string;
    phone_number: string;
    city: string;
    street: string;
    zip_code: string;
}

export type EmployeeList = Employee[];

export interface PostEmployee {
    id: string;
    surname: string;
    name: string;
    patronymic?: string;
    role: string;
    salary: number;
    birth: string;
    start: string;
    phone: string;
    city: string;
    street: string;
    'zip-code': string;
}

export interface BaseProduct {
    id_product: string;
    category_number: number;
    product_name: string;
    characteristics: string;
    picture?: string;
}

export type BaseProductList = BaseProduct[];

export interface PostBaseProduct {
    'id-product': string;
    'category-number': number;
    name: string;
    characteristics: string;
    picture?: string;
}

export interface StoreProduct {
    upc: string;
    upc_prom?: string;
    id_product: number;
    selling_price: number;
    products_number: number;
    expire_date: string; 
    promotional_product: boolean;
}

export type StoreProductList = StoreProduct[];

export interface PostStoreProduct {
    UPC: string;
    id: number;
    price: number;
    'products-number': number;
    'expire-date': string; 
}