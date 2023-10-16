export {};

declare global {
    interface IProductsList {
        products: IProduct[];
        total: number;
    }

    interface IProduct {
        author?: User;
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

    interface IReview {
        _id: string;
        text: string;
        author?: User;
        product?: string;
        updated_at?: string;
        created_at?: string;
        rating: number;
    }
    interface Post {
        image: string;
        likes: string[];
        comments: IReview[];
        tags: string[];
        isPublished?: boolean;
        _id: string;
        title: string;
        author: User;
        text: string;
        created_at?: string;
        updated_at?: string;
        __v?: number;
    }

    interface User {
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
