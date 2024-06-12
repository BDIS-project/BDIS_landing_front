export interface Product {
    id_product: number;
    product_name: string;
    //image: string;
    selling_price: string;
    products_number: number;
    //rating: number;
    promotional_product: boolean;
}

export type ProductList = Product[];