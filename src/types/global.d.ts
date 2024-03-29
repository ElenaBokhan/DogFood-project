export {};

declare global {
    interface IClientFilter {
        search: string;
        page: number;
        perPage: number;
    }

    interface IProductsList {
        products: IProduct[];
        total: number;
    }

    interface IProduct {
        author?: IUser;
        name: string;
        price: number;
        discount: number;
        wight: string;
        description: string;
        created_at: string;
        likes: string[];
        isPublished: boolean;
        isCart?: boolean;
        available?: boolean;
        stock?: number;
        pictures: string;
        reviews: IReview[];
        tags: string[];
        __v: number;
        _id: string;
    }

    interface INewProduct {
        author?: IUser;
        name: string;
        price: number;
        discount: number;
        wight: string;
        description: string;
        available?: boolean;
        stock?: number;
        pictures: string;
        tags?: string[];
    }

    interface IReview {
        _id?: string;
        text: string;
        author?: IUser;
        product?: string;
        updated_at?: string;
        created_at?: string;
        rating: number;
    }

    interface IUser {
        name: string;
        about: string;
        avatar: string;
        _id: string;
        email: string;
        __v?: number;
        group?: string;
    }

    type PostLikeParam = {
        _id: string;
        likes: string[];
    };
}
