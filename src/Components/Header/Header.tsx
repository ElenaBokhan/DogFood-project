import cartIcon from 'assets/ic-cart.svg';
import profileIcon from 'assets/ic-profile.svg';
import Logo from 'assets/Logo.svg';
import logOut from 'assets/log-out.svg';
import addNewIcon from 'assets/add-new.svg';
import favouritesIcon from 'assets/profile-favorites.svg';
import HeaderContainer, {EContainerType} from 'Components/Common/Container/Container';
import styles from 'Components/Header/Header.module.css';
import {SearchForm} from 'Components/SearchForm/SearchForm';
import {useLocation, useNavigate} from 'react-router-dom';
import {IconButton} from 'Components/Common/IconButton/IconButton';
import {UseAppSelector} from 'Store/hooks';
import {selectCartCount} from 'Store/Slices/cart/CartSelectors';
import {selectFavouritesCount} from 'Store/Slices/favourites/FavouritesSelector';
import {useActions} from 'hooks/hooks';
import {ETestId} from 'Enum';
import { accessTokenSelector } from 'Store/Slices/auth/AuthSelectors';

export const Header = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const {clearTokens} = useActions();
    const cartCount = UseAppSelector(selectCartCount);
    const favouriteCount = UseAppSelector(selectFavouritesCount);

    const accessToken = UseAppSelector(accessTokenSelector);

    const renderLogo = () => (
        <img data-testid={ETestId.HEADER_MAIN_LOGO} width={224} height={56} src={Logo} alt="logoMain" />
    );

    const redirect = (path: string) => () => navigate(path);

    const handleLogOut = () => {
        clearTokens();
        navigate('/signin');
    };

    const renderHeaderProfileIcons = () => {
        const headerIconConfig = [
            {
                name: favouritesIcon,
                onClick: redirect('/favourites'),
                babl: favouriteCount,
                testId: ETestId.HEADER_FAVOURITES_ICON,
            },
            {name: cartIcon, onClick: redirect('/cart'), babl: cartCount, testId: ETestId.HEADER_CART_ICON},
            {name: profileIcon, onClick: redirect('/profile'), testId: ETestId.HEADER_PROFILE_ICON},
            {name: addNewIcon, onClick: redirect('/addProduct'), testId: ETestId.HEADER_ADD_NEW_ICON},
            {name: logOut, onClick: handleLogOut, testId: ETestId.HEADER_LOG_OUT_ICON},
        ];

        return (
            <div className={styles.profilesIcons}>
                {headerIconConfig.map(({name, onClick, babl, testId}, index) => {
                    return (
                        <div key={index} className={styles.profilesIcon}>
                            {!!babl && <div className={styles.babl}>{babl}</div>}
                            <IconButton testId={testId} key={index} icon={name} onClick={onClick} alt="headerIcon" />
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <HeaderContainer className={styles.header} type={EContainerType.HEADER}>
            {renderLogo()}
            {accessToken && pathname === '/' && <SearchForm />}
            {accessToken && renderHeaderProfileIcons()}
        </HeaderContainer>
    );
};

