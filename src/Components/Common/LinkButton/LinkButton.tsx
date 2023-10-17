import {Button, EButtonTheme} from 'Components/Common/Button/Button';
import styles from 'Components/Common/LinkButton/LinkButton.module.css';
import {Link} from 'react-router-dom';

interface ILinkButtonProps {
    label: string;
    path: string;
}

export const LinkButton = ({path, label}: ILinkButtonProps) => (
    <Link className={styles.link} to={path}>
        <Button label={label} theme={EButtonTheme.REDIRECT} />
    </Link>
);
