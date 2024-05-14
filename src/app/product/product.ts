export interface Product {
value: number;
    id: string;
    name: string;
    description?: string;
    highPrice: number;
    lowPrice: number;
    discountedHighPrice?: number;
    discountedLowPrice?: number;
    priceDiscountPercent?: number;
    specification?: {
        id: string;
        model: string;
        material: string;
        shipping: boolean;

    };
    sold?: any;
    tag?: string;
    category?: string;
    ratingsQuantity?: number;
    ratingsAverage: number;
    images?: string[];
    color?: [
        {
            id: string;
            color: string;
            quantity: number;
            discountPrice: number;
            price: number;
            colorImage: string;
        }
    ];
    slug?: string;
    imageCover?: string;
    quantity?: any;
    reviewStat?: any;
    reviews?: any

}

