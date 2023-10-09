import cartIcon from 'assets/ic-cart.svg';
import profileIcon from 'assets/ic-profile.svg';
import Logo from 'assets/Logo.svg';
import favouritesIcon from 'assets/profile-favorites.svg';
import HeaderContainer, {EContainerType} from 'Components/Common/Container/Container';
import styles from 'Components/Header/Header.module.css';
import {SearchForm} from 'Components/SearchForm/SearchForm';
import {ProductsContext} from 'context/ProductsProvider';
import {useContext} from 'react';
import {Link, useLocation} from 'react-router-dom';

export const Header = () => {
    const {state} = useLocation();
    const {handleSearch} = useContext(ProductsContext);
    const renderLogo = () => {
        return (
            <div className={styles.logo}>
                <img src={Logo} alt='headerLogo' />
            </div>
        );
    };

    const renderHeaderProfileIcons = () => {
        const headerIconConfig = [
            {name: favouritesIcon, path: '/favourites'},
            {name: cartIcon, path: '/cart'},
            {name: profileIcon, path: '/profile'},
        ];

        return (
            <div className={styles.profilesIcons}>
                {headerIconConfig.map(({name, path}) => (
                    <Link key={path} state={state} to={path}>
                        <img src={name} alt='profileIcon' />
                    </Link>
                ))}
            </div>
        );
    };

    return (
        <HeaderContainer className={styles.header} type={EContainerType.HEADER}>
            {renderLogo()}
            <SearchForm onSearch={handleSearch} />
            {renderHeaderProfileIcons()}
        </HeaderContainer>
    );
};
