import instagramIcon from 'assets/logo-instagram.svg';
import vkIcon from 'assets/logo-vk.svg';
import Logo from 'assets/Logo.svg';
import tgIcon from 'assets/telegram 1.svg';
import viberIcon from 'assets/viber 1.svg';
import whatsappIcon from 'assets/whatsapp 1.svg';
import FooterContainer, {EContainerType} from 'Components/Common/Container/Container';
import {IconButton} from 'Components/Common/IconButton/IconButton';
import {EFontWeight, ETextType, Text} from 'Components/Common/Text/Text';
import styles from 'Components/Footer/Footer.module.css';

export const Footer = () => {
    const renderFooterLogo = () => (
        <div className={styles.logoBlock}>
            <img alt="logo" src={Logo} />
            <Text type={ETextType.S2} value={'© «Интернет-магазин DogFood.ru»'} />
        </div>
    );
    const renderMenu = () => {
        const menu = [
            ['Каталог', 'Акции', 'Новости', 'Отзывы'],
            ['Оплата и доставка', 'Часто спрашивают', 'Обратная связь', 'Контакты'],
        ];
        return (
            <>
                {menu.map((column, index) => {
                    return (
                        <ul key={index}>
                            {column.map((menuItem) => {
                                return (
                                    <li key={menuItem}>
                                        <Text type={ETextType.P2} value={menuItem} />
                                    </li>
                                );
                            })}
                        </ul>
                    );
                })}
            </>
        );
    };

    const renderContactsGroup = () => (
        <div className={styles.contacts}>
            <Text value={'Мы на связи'} weight={EFontWeight.GENERAL} />
            <Text value={'8 (999) 00-00-00'} />
            <Text type={ETextType.S1} value={'dogfood.ru@gmail.com'} />
            <div className={styles.social}>
                <IconButton alt="telegramLogo" icon={tgIcon} />
                <IconButton alt="whatsappLogo" icon={whatsappIcon} />
                <IconButton alt="viberLogo" icon={viberIcon} />
                <IconButton alt="instagramLogo" icon={instagramIcon} />
                <IconButton alt="vkLogo" icon={vkIcon} />
            </div>
        </div>
    );

    return (
        <FooterContainer className={styles.footer} type={EContainerType.FOOTER}>
            {renderFooterLogo()}
            {renderMenu()}
            {renderContactsGroup()}
        </FooterContainer>
    );
};
