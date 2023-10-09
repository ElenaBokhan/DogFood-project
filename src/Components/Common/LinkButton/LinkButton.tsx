import {Button, EButtonType} from 'Components/Common/Button/Button';
import styles from 'Components/Common/LinkButton/LinkButton.module.css';
import {Link} from 'react-router-dom';

interface ILinkButtonProps {
    label: string;
    path: string;
}

export const LinkButton = ({path, label}: ILinkButtonProps) => {
    return (
        <Link className={styles.link} to={path}>
            <Button label={label} type={EButtonType.REDIRECT} />
        </Link>
    );
};
