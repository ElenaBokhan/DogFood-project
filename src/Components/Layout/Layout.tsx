import MainContainer, {EContainerType} from 'Components/Common/Container/Container';
import {Footer} from 'Components/Footer/Footer';
import {Header} from 'Components/Header/Header';
import styles from 'Components/Layout/Layout.module.css';
import {useLayoutEffect} from 'react';
import {Outlet} from 'react-router-dom';
import {getUserProfile} from 'Slices/userProfile/UserProfileSlice';
import {UseAppDispatch} from 'Store/hooks';

export const Layout = () => {
    const dispatch = UseAppDispatch();

    useLayoutEffect(() => {
        dispatch(getUserProfile());
    }, []);

    return (
        <div className={styles.layout}>
            <Header />
            <MainContainer className={styles.main} type={EContainerType.MAIN}>
                <Outlet />
            </MainContainer>
            <Footer />+{' '}
        </div>
    );
};
