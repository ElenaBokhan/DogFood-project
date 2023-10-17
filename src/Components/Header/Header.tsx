import cartIcon from 'assets/ic-cart.svg';
import profileIcon from 'assets/ic-profile.svg';
import Logo from 'assets/Logo.svg';
import logOut from 'assets/log-out.svg';
import favouritesIcon from 'assets/profile-favorites.svg';
import HeaderContainer, {EContainerType} from 'Components/Common/Container/Container';
import styles from 'Components/Header/Header.module.css';
import {SearchForm} from 'Components/SearchForm/SearchForm';
import {useNavigate} from 'react-router-dom';
import {IconButton} from 'Components/Common/IconButton/IconButton';
import {UseAppDispatch} from 'Store/hooks';
import {clearTokens} from 'Store/Slices/Auth/AuthSlice';

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = UseAppDispatch();

    const renderLogo = () => <img width={224} height={56} src={Logo} alt="logoMain" />;

    const redirect = (path: string) => () => navigate(path);

    const handleLogOut = () => {
        dispatch(clearTokens);
        navigate('/signin');
    };

    const renderHeaderProfileIcons = () => {
        const headerIconConfig = [
            {name: favouritesIcon, onClick: redirect('/favourites')},
            {name: cartIcon, onClick: redirect('/cart')},
            {name: profileIcon, onClick: redirect('/profile')},
            {name: logOut, onClick: handleLogOut},
        ];

        return (
            <div className={styles.profilesIcons}>
                {headerIconConfig.map(({name, onClick}, index) => (
                    <IconButton key={index} icon={name} onClick={onClick} alt="headerIcon" />
                ))}
            </div>
        );
    };

    return (
        <HeaderContainer className={styles.header} type={EContainerType.HEADER}>
            {renderLogo()}
            <SearchForm />
            {renderHeaderProfileIcons()}
        </HeaderContainer>
    );
};
