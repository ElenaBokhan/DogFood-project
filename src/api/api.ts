import {config} from 'api/config';
// eslint-disable-next-line import/named
import axios, {AxiosResponse, CreateAxiosDefaults} from 'axios';

interface IClientFilter {
    search: string;
    page: number;
    perPage: number;
}

const {get} = axios.create({
    baseURL: config.apiUrl,
    headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${config.apiToken}`,
    },
} as CreateAxiosDefaults);

class Api {
    private onAxiosResponse(res: AxiosResponse) {
        return res.data ? res.data : Promise.reject();
        // return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
    }

    getUserInfo = () => get<User>('/users/me').then((response) => this.onAxiosResponse(response));

    getProductList = ({search, page, perPage}: IClientFilter) =>
        get<IProductsList>(`/products?page=${page}&limit=${perPage}&query=${search}`).then((response) =>
            this.onAxiosResponse(response)
        );

    getProductById = (productId: string) =>
        get<IProduct>(`/products/${productId}`).then((response) => this.onAxiosResponse(response));
}

export default new Api();
