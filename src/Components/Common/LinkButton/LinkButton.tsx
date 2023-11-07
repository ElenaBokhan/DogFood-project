import {Button, EButtonTheme} from 'Components/Common/Button/Button';
import {Link} from 'react-router-dom';

interface ILinkButtonProps {
    label: string;
    path: string;
    state?: IProduct;
}

export const LinkButton = ({path, label, state}: ILinkButtonProps) => (
    <Link state={state} to={path}>
        <Button label={label} theme={EButtonTheme.REDIRECT} />
    </Link>
);
