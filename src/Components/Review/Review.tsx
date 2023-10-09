import starFillIcon from 'assets/ic-star-fill.svg';
import starIcon from 'assets/ic-star.svg';
import {Text} from 'Components/Common/Text/Text';
import styles from 'Components/Pagination/Pagination.module.css';

interface IReviewProps {
    review: IReview;
}

export const Review = ({review}: IReviewProps) => {
    const {author, created_at, rating, text} = review;

    const renderStars = () => {
        return [...Array(5)].map((_, index) => (
            <img alt="star" key={index} src={index < rating ? starFillIcon : starIcon} />
        ));
    };

    return (
        <div className={styles}>
            <Text value={author.name} />
            <Text value={created_at} />
            {renderStars()}
            <Text value={text} />
        </div>
    );
};
