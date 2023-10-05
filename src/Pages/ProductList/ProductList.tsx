import {IProduct, ProductItem} from 'Components/ProductItem/ProductItem';
import style from 'Pages/ProductList/ProductList.module.css';

interface IProductListProps {
    products: IProduct[];
}

export const ProductList = ({products}: IProductListProps) => {
    return (
        <div className={style.productList}>
            {products?.map((product, index) => (
                <ProductItem key={index} product={product} />
            ))}
        </div>
    );
};
