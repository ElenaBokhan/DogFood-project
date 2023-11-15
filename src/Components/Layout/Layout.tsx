import MainContainer, {EContainerType} from 'Components/Common/Container/Container';
import {Footer} from 'Components/Footer/Footer';
import {Header} from 'Components/Header/Header';
import styles from 'Components/Layout/Layout.module.css';
import {Outlet} from 'react-router-dom';

export const Layout = () => {
    return (
        <div className={styles.layout}>
            <Header />
            <MainContainer className={styles.main} type={EContainerType.MAIN}>
                <Outlet />
            </MainContainer>
            <Footer />
        </div>
    );
};
