import {Button} from 'Components/Common/Button/Button';
import {Text} from 'Components/Common/Text/Text';
import {TitlePage} from 'Components/Common/TitlePage/TitlePage';
import styles from 'Pages/AddReview/AddReview.module.css';
import {useLocation, useNavigate} from 'react-router-dom';
import starFillIcon from 'assets/ic-star-fill.svg';
import starIcon from 'assets/ic-star.svg';
import {useEffect, useState} from 'react';
import {ETestId} from 'Enum';
import {IconButton} from 'Components/Common/IconButton/IconButton';
import {useAddRewiewMutation} from 'Store/Api/productListApi';
import {Gap} from 'Components/Common/Gap/Gap';

export const AddReview = () => {
    const {state} = useLocation();
    const {name: productName, _id} = state;
    const [addReview, {isSuccess}] = useAddRewiewMutation();
    const navigate = useNavigate();

    const [reviewText, setReviewText] = useState<string>('');
    const [currentRating, setCurrentRating] = useState<number>(null);

    useEffect(() => {
        isSuccess && navigate(`/product/${_id}`);
    }, [_id, isSuccess, navigate]);

    const handleReviewChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const reviewText = event.currentTarget.value;
        setReviewText(reviewText);
    };

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        if (currentRating || reviewText) {
            addReview({productId: _id, review: {rating: currentRating, text: reviewText}});
        }
        event.preventDefault();
    };

    const handleSetRating = (rate: number) => {
        setCurrentRating(rate);
    };

    const renderStars = () => {
        return [...Array(5)].map((_, index) => (
            <IconButton
                onClick={() => handleSetRating(index + 1)}
                key={index}
                icon={index < currentRating ? starFillIcon : starIcon}
                alt={'ratingProduct'}
            />
        ));
    };

    const renderAddReviewForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <Text value={'Общая оценка'} />
                    {renderStars()}
                </div>
                <div className={styles.field}>
                    <Text value={'Комментарий'} />
                    <input
                        className={styles.reviewTextarea}
                        type="textarea"
                        data-testid={ETestId.ADD_REVIEW_TEXT_INPUT}
                        onChange={handleReviewChange}
                        placeholder={'Поделитесь впечатлениями о товаре'}
                        value={reviewText}
                    />
                </div>
                <Button testId={ETestId.ADD_REVIEW_SUBMIT_BUTTON} type="submit" label={'Отправить отзыв'} />
            </form>
        );
    };

    return (
        <div className={styles.addReviewPage}>
            <TitlePage label={`Отзыв о товаре ${productName}`} />
            <Gap size={40} />
            <hr />
            {renderAddReviewForm()}
        </div>
    );
};
