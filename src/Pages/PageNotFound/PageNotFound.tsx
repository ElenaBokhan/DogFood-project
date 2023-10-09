import {LinkButton} from 'Components/Common/LinkButton/LinkButton';
import {EFontColor, ETextType, Text} from 'Components/Common/Text/Text';
import styles from 'Pages/PageNotFound/PageNotFound.module.css';

export const PageNotFound = () => {
    return (
        <div className={styles.pageNotFound}>
            <Text fontColor={EFontColor.YELLOW} type={ETextType.EXTRA} value={'404'} />
            <Text value={'Страница по этому адресу не найдена'} />
            <LinkButton label={'На главную'} path={'/'} />
        </div>
    );
};
