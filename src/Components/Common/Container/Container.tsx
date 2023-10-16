import cn from 'classnames';
import styles from 'Components/Common/Container/Container.module.css';
import {Loader} from 'Components/Common/Loader/Loader';
import {ProductsContext} from 'context/ProductsProvider';
import React, {useContext} from 'react';

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

const Container: React.FC<IContainerProps> = ({children, type, className}: IContainerProps) => {
    const {isLoading} = useContext(ProductsContext);

    const getContent = () => {
        return <div className={cn(styles.container, className)}>{children}</div>;
    };

    const getContainer = () => {
        switch (type) {
            case EContainerType.HEADER:
                return <header className={styles[type]}>{getContent()}</header>;
            case EContainerType.MAIN:
                return (
                    <main className={styles[type]}>
                        {isLoading && <Loader />}
                        {getContent()}
                    </main>
                );
            case EContainerType.FOOTER:
                return <footer className={styles[type]}>{getContent()}</footer>;
        }
    };

    return getContainer();
};

export default Container;
