import api from 'api/api';
import MainContainer, {EContainerType} from 'Components/Common/Container/Container';
import {Footer} from 'Components/Footer/Footer';
import {Header} from 'Components/Header/Header';
import styles from 'Components/Layout/Layout.module.css';
import {ProductsProvider} from 'context/ProductsProvider';
import {createContext} from 'react';
import {Outlet, useLoaderData} from 'react-router-dom';

export const UserContext = createContext<User>(null);

interface ILoaderData {
    user: User;
}

export const Layout = () => {
    const {user} = useLoaderData() as ILoaderData;

    return (
        <UserContext.Provider value={user}>
            <ProductsProvider>
                <div className={styles.layout}>
                    <Header />
                    <MainContainer className={styles.main} type={EContainerType.MAIN}>
                        <Outlet />
                    </MainContainer>
                    <Footer />
                </div>
            </ProductsProvider>
        </UserContext.Provider>
    );
};

export const loaderLayout = async () => {
    const getUser = async () => {
        const user = await api.getUserInfo();
        return user;
    };

    return {user: await getUser()};
};
