import arrowPrev from 'assets/ic-left-arrow.svg';
import arrowNext from 'assets/ic-right-arrow.svg';
import {Button, EButtonType} from 'Components/Common/Button/Button';
import styles from 'Components/Pagination/Pagination.module.css';

interface IPaginationProps {
    currentPage: number;
    onChange: (page: number) => void;
    total: number;
}

const PER_PAGE = 16;
const PAGINATION_PAGE_AMOUNT = 5;

enum EArrow {
    LEFT,
    RIGHT,
}

export const Pagination = ({currentPage, onChange, total}: IPaginationProps) => {
    const lastIndexPage = Math.floor(total / PER_PAGE);

    const handlePrevPage = () => {
        onChange(currentPage - 1);
    };

    const handleNextPage = () => {
        onChange(currentPage + 1);
    };

    // пока неясно что с ней делать и как оно должно работать, позже..
    // const handleDotsPage = (page: number) => {
    //     onChange(page + 1);
    // };

    const renderArrowButton = (arrow: EArrow) => {
        const {disable, icon, label, onChange} =
            arrow === EArrow.LEFT
                ? {icon: arrowPrev, label: 'Назад', onChange: handlePrevPage, disable: currentPage === 1}
                : {icon: arrowNext, label: 'Вперед', onChange: handleNextPage, disable: currentPage === lastIndexPage};

        const labelButton = (
            <>
                <img src={icon} />
                <span>{label}</span>
            </>
        );

        return <Button disable={disable} label={labelButton} onChange={onChange} type={EButtonType.REDIRECT} />;
    };

    const renderPageItems = () => {
        const pageItems = [];

        let startIndexPage;
        let endIndexPage;

        if (currentPage < 3) {
            startIndexPage = 1;
            endIndexPage = 5;
        } else if (currentPage >= lastIndexPage - 2) {
            startIndexPage = lastIndexPage - 4;
            endIndexPage = lastIndexPage;
        } else {
            startIndexPage = currentPage - 2;
            endIndexPage = currentPage + 2;
        }

        const dotsPage = '...';

        for (let i = startIndexPage; i <= endIndexPage; i++) {
            pageItems.push(i);
        }

        if (lastIndexPage > PAGINATION_PAGE_AMOUNT) {
            if (currentPage < lastIndexPage - 2) {
                pageItems.push(dotsPage);
                pageItems.push(lastIndexPage);
            }

            if (currentPage >= lastIndexPage - 2) {
                pageItems.unshift(dotsPage);
                pageItems.unshift(1);
            }
        }

        return (
            <div className={styles.paginationItems}>
                {pageItems.map((item, index) => (
                    <Button
                        className={item === currentPage && 'selected'}
                        disable={item === dotsPage}
                        key={index}
                        label={item}
                        onChange={onChange}
                        type={EButtonType.PAGINATION}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className={styles.pagination}>
            {renderArrowButton(EArrow.LEFT)}
            {renderPageItems()}
            {renderArrowButton(EArrow.RIGHT)}
        </div>
    );
};
