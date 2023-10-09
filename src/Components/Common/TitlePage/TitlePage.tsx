import {Breadcrumbs} from 'Components/Common/Breadcrumbs/Breadcrumbs';
import {ETextType, Text} from 'Components/Common/Text/Text';

interface ITitleProps {
    label: string;
    pathName?: string;
}

export const TitlePage = ({label, pathName}: ITitleProps) => {
    return (
        <>
            <Breadcrumbs pathName={pathName} />
            <Text type={ETextType.H1} value={label} />
        </>
    );
};