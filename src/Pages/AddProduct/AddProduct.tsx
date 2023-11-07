import {Button} from 'Components/Common/Button/Button';
import {TitlePage} from 'Components/Common/TitlePage/TitlePage';
import styles from 'Pages/AddReview/AddReview.module.css';
import {useEffect, useState} from 'react';
import {useAddProductMutation} from 'Store/Api/productListApi';
import {Gap} from 'Components/Common/Gap/Gap';
import {FieldForm} from 'Components/Common/FieldForm/FieldForm';
import {useNavigate} from 'react-router-dom';
import {ETestId} from 'Enum';

export interface IProductMap {
    label: string;
    value: string | number;
    param: keyof INewProduct;
    testId: ETestId;
}

export const AddProduct = () => {
    const [addProduct, {isSuccess, data}] = useAddProductMutation();
    const navigate = useNavigate();

    const getInitialProduct = (): IProductMap[] => [
        {
            param: 'name',
            label: 'Название товара',
            value: '',
            testId: ETestId.ADD_PRODUCT_NAME_INPUT,
        },
        {
            param: 'price',
            label: 'Цена товара',
            value: '',
            testId: ETestId.ADD_PRODUCT_PRICE_INPUT,
        },
        {
            param: 'description',
            label: 'Описание',
            value: '',
            testId: ETestId.ADD_PRODUCT_DESCRIPTION_INPUT,
        },
        {
            param: 'discount',
            label: 'Скидка',
            value: '',
            testId: ETestId.ADD_PRODUCT_DISCOUNT_INPUT,
        },
        {
            param: 'stock',
            label: 'Наличие',
            value: '',
            testId: ETestId.ADD_PRODUCT_STOCK_INPUT,
        },
        {
            param: 'wight',
            label: 'Вес',
            value: '',
            testId: ETestId.ADD_PRODUCT_WIGHT_INPUT,
        },
        {
            param: 'pictures',
            label: 'Добавьте фото',
            value: '',
            testId: ETestId.ADD_PRODUCT_PICTURES_INPUT,
        },
    ];

    const [product, setProduct] = useState<IProductMap[]>(getInitialProduct());

    useEffect(() => {
        isSuccess && navigate(`/product/${data._id}`);
    }, [data?._id, isSuccess, navigate]);

    const isNotEmptyValues = (): boolean => {
        for (const field of product) {
            if (field.value === '') return false;
        }

        return true;
    };

    const getNewProduct = (): INewProduct => {
        const newProduct: any = {}; // TODO: разобраться с типизацией

        product.forEach(({value, param}) => {
            newProduct[param] = value;
        });

        return newProduct;
    };

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        if (isNotEmptyValues()) {
            addProduct(getNewProduct());
        }
        event.preventDefault();
    };

    const handleSetProduct = (value: string | number, param: keyof INewProduct) => {
        const currentValue = param === 'price' || param === 'discount' || param === 'stock' ? Number(value) : value;

        const newProducts: IProductMap[] = product.map((item) =>
            item.param === param ? {...item, value: currentValue} : item
        );
        setProduct(newProducts);
    };

    const renderAddProductForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                {product.map((field) => (
                    <FieldForm key={field.label} onChange={handleSetProduct} field={field} />
                ))}

                <Button testId={ETestId.ADD_PRODUCT_SUBMIT_BUTTON} type="submit" label={'Добавить продукт'} />
            </form>
        );
    };

    return (
        <div className={styles.addReviewPage}>
            <TitlePage label={'Добавление нового товара'} />
            <Gap size={40} />
            <hr />
            {renderAddProductForm()}
        </div>
    );
};
