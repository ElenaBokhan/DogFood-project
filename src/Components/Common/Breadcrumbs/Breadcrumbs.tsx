import bcLeftArrow from 'assets/ic-left-bc-arrow.svg';
import styles from 'Components/Common/Breadcrumbs/Breadcrumbs.module.css';
import {EFontColor, ETextType, Text} from 'Components/Common/Text/Text';
import {ETestId} from 'Enum';
import {Link} from 'react-router-dom';

interface IBreadcrumbs {
    pathName?: string;
}

export const Breadcrumbs = ({pathName = '/'}: IBreadcrumbs) => {
    return (
        <Link data-testid={ETestId.BREADCRUMBS_BUTTON} className={styles.breadcrumbs} to={pathName}>
            <img src={bcLeftArrow} alt="arrow" />
            <Text fontColor={EFontColor.GREY} type={ETextType.S2} value={'Назад'} />
        </Link>
    );
};
