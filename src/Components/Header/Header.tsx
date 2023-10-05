import cartIcon from 'assets/ic-cart.svg';
import profileIcon from 'assets/ic-profile.svg';
import Logo from 'assets/Logo.svg';
import favouritesIcon from 'assets/profile-favorites.svg';
import HeaderContainer, {EContainerType} from 'Components/Common/Container/Container';
import styles from 'Components/Header/Header.module.css';
import {SearchForm} from 'Components/SearchForm/SearchForm';

interface IHeaderProps {
    onSearch: (search: string) => void;
}

export const Header = ({onSearch}: IHeaderProps) => {
    const renderLogo = () => {
        return (
            <div className={styles.logo}>
                <img src={Logo} />
            </div>
        );
    };

    const renderHeaderProfileIcons = () => {
        return (
            <div className={styles.profilesIcons}>
                <img src={favouritesIcon} />
                <img src={cartIcon} />
                <img src={profileIcon} />
            </div>
        );
    };

    return (
        <HeaderContainer className={styles.header} type={EContainerType.HEADER}>
            {renderLogo()}
            <SearchForm onSearch={onSearch} />
            {renderHeaderProfileIcons()}
        </HeaderContainer>
    );
};
