import {Button, EButtonTheme} from 'Components/Common/Button/Button';
import {Link} from 'react-router-dom';

interface ILinkButtonProps {
    label: string;
    path: string;
}

export const LinkButton = ({path, label}: ILinkButtonProps) => (
    <Link to={path}>
        <Button label={label} theme={EButtonTheme.REDIRECT} />
    </Link>
);
