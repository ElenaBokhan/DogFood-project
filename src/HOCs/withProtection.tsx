import {ComponentType, FC} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {UseAppSelector} from 'Store/hooks';
import {accessTokenSelector} from 'Store/Slices/Auth/AuthSelectors';

export const withProtection = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const ReturnedComponent: FC<P> = (props) => {
        const accessToken = UseAppSelector(accessTokenSelector);
        const location = useLocation();

        if (!accessToken) {
            return (
                <Navigate
                    to="/signin"
                    state={{
                        from: location.pathname,
                    }}
                />
            );
        }

        return <WrappedComponent {...props} />;
    };

    ReturnedComponent.displayName = `withProtection${WrappedComponent.displayName}`;
    return ReturnedComponent;
};
