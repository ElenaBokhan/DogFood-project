import cn from 'classnames';
import styles from 'Components/Common/Container/Container.module.css';
import {Loader} from 'Components/Common/Loader/Loader';
import React, {useState} from 'react';

interface IContainerProps {
    className?: string;
    type: EContainerType;
    children: React.ReactNode;
}
export enum EContainerType {
    HEADER = 'headerContainer',
    FOOTER = 'footerContainer',
    MAIN = 'mainContainer',
}

export const LoadingContext = React.createContext<(isLoading: boolean) => void>(null);

const Container: React.FC<IContainerProps> = ({children, type, className}: IContainerProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleLoading = (isLoading: boolean) => {
        setIsLoading(isLoading);
    };

    const getContent = () => {
        return <div className={cn(styles.container, className)}>{children}</div>;
    };

    const getContainer = () => {
        switch (type) {
            case EContainerType.HEADER:
                return <header className={styles[type]}>{getContent()}</header>;
            case EContainerType.MAIN:
                return (
                    <LoadingContext.Provider value={handleLoading}>
                        <main className={styles[type]}>
                            {isLoading && <Loader />}
                            {getContent()}
                        </main>
                    </LoadingContext.Provider>
                );
            case EContainerType.FOOTER:
                return <footer className={styles[type]}>{getContent()}</footer>;
        }
    };

    return getContainer();
};

export default Container;
