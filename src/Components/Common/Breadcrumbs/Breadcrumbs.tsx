import bcLeftArrow from 'assets/ic-left-bc-arrow.svg';
import styles from 'Components/Common/Breadcrumbs/Breadcrumbs.module.css';
import {EFontColor, ETextType, Text} from 'Components/Common/Text/Text';
import {Link} from 'react-router-dom';

interface IBreadcrumbs {
    pathName?: string;
}

export const Breadcrumbs = ({pathName = '/'}: IBreadcrumbs) => {
    return (
        <Link className={styles.link} to={pathName}>
            <div className={styles.breadcrumbs}>
                <img alt="bcLeftArrow" src={bcLeftArrow} />
                <Text fontColor={EFontColor.GREY} type={ETextType.S2} value={'Назад'} />
            </div>
        </Link>
    );
};
