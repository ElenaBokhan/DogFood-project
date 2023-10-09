import {ProductItem} from 'Components/ProductItem/ProductItem';
import style from 'Components/ProductList/ProductList.module.css';

interface IProductListProps {
    products: IProduct[];
}

export const ProductList = ({products}: IProductListProps) => {
    return (
        <div className={style.productList}>
            {products?.map((product) => (
                <ProductItem key={product._id} product={product} />
            ))}
        </div>
    );
};
