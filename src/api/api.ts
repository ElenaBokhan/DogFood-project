import {config} from 'api/config';
import axios from 'axios';
import type {AxiosResponse, CreateAxiosDefaults} from 'axios';

export interface IUpdateUserRequest {
    name: string;
    about: string;
}

const {
    get,
    patch,
    post,
    // put,
    // delete: deleteAxios,
} = axios.create({
    baseURL: config.apiUrl,
    headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${config.apiToken}`,
    },
} as CreateAxiosDefaults);

export class Api {
    private onAxiosResponse(res: AxiosResponse) {
        return res.data ? Promise.resolve(res.data) : Promise.reject();
    }

    getUserProfile = () => get<IUser>('/users/me').then((response) => this.onAxiosResponse(response));

    updateUserProfile = (userData: IUpdateUserRequest) =>
        patch<IUser>('/users/me', userData).then((response) => this.onAxiosResponse(response));

    addReview = (productId: string) =>
        post<IProduct>(`/products/review/${productId}`).then((response) => this.onAxiosResponse(response));
}

export default new Api();
