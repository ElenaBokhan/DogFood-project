import arrowDown from 'assets/ic-down-arrow.svg';
import {Button, EButtonTheme} from 'Components/Common/Button/Button';
import {NotFound} from 'Components/Common/NotFound/NotFound';
import {TitlePage} from 'Components/Common/TitlePage/TitlePage';
import {ProductItem} from 'Components/ProductItem/ProductItem';
import style from 'Pages/Favourites/Favourites.module.css';

export const Favourites = () => {
    const products: IProduct[] = [];

    const renderButton = () => {
        const labelButton = (
            <>
                <span>{'Показать еще'}</span>
                <img src={arrowDown} alt="arrowDown" />
            </>
        );

        return <Button label={labelButton} theme={EButtonTheme.REDIRECT} />;
    };

    return (
        <div className={style.favourites}>
            <TitlePage label={'Избранное'} />
            {products.length > 0 ? (
                <>
                    {products.map((product, index) => (
                        <ProductItem key={index} product={product} />
                    ))}
                    {renderButton()}
                </>
            ) : (
                <NotFound />
            )}
        </div>
    );
};
