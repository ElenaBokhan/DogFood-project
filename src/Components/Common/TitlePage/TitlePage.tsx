import {Breadcrumbs} from 'Components/Common/Breadcrumbs/Breadcrumbs';
import {ETextType, Text} from 'Components/Common/Text/Text';
import {ETestId} from 'Enum';

interface ITitleProps {
    label: string;
    pathName?: string;
}

export const TitlePage = ({label, pathName}: ITitleProps) => (
    <div data-testid={ETestId.TITLE_PAGE}>
        <Breadcrumbs pathName={pathName} />
        <Text type={ETextType.H1} value={label} />
    </div>
);
