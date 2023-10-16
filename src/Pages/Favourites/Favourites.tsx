import arrowDown from 'assets/ic-down-arrow.svg';
import {Button, EButtonType} from 'Components/Common/Button/Button';
import {NotFound} from 'Components/Common/NotFound/NotFound';
import {TitlePage} from 'Components/Common/TitlePage/TitlePage';
import {ProductItem} from 'Components/ProductItem/ProductItem';
import style from 'Pages/Favourites/Favourites.module.css';

export const Favourites = () => {
    // TODO: разобраться с получением списка(локальный только?)
    const products: IProduct[] = [];

    const renderButton = () => {
        const labelButton = (
            <>
                <span>{'Показать еще'}</span>
                <img alt="arrowDown" src={arrowDown} />
            </>
        );

        return <Button label={labelButton} type={EButtonType.REDIRECT} />;
    };

    return (
        <div className={style.favourites}>
            <TitlePage label={'Избранное'} />
            {products.length > 0 ? (
                <>
                    {products.map((product) => (
                        <ProductItem key={product._id} product={product} />
                    ))}
                    {renderButton()}
                </>
            ) : (
                <NotFound />
            )}
        </div>
    );
};
