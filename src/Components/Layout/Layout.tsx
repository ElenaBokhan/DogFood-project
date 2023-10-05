import MainContainer, {EContainerType} from 'Components/Common/Container/Container';
import {Footer} from 'Components/Footer/Footer';
import {Header} from 'Components/Header/Header';
import styles from 'Components/Layout/Layout.module.css';
import {Catalog} from 'Pages/Catalog/Catalog';
import {useState} from 'react';

export const Layout = () => {
    const [searchText, setSearchText] = useState<string>('');

    const handleChangeSearch = (search: string) => {
        setSearchText(search);
    };

    return (
        <div className={styles.layout}>
            <Header onSearch={handleChangeSearch} />
            <MainContainer type={EContainerType.MAIN}>
                <Catalog search={searchText} />
            </MainContainer>
            <Footer />
        </div>
    );
};
