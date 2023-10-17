import arrowPrev from 'assets/ic-left-arrow.svg';
import arrowNext from 'assets/ic-right-arrow.svg';
import {Button, EButtonTheme} from 'Components/Common/Button/Button';
import styles from 'Components/Pagination/Pagination.module.css';
import {PER_PAGE} from 'Const';
import {UseAppDispatch} from 'Store/hooks';
import {changePage} from 'Store/Slices/productList/ProductListSlice';

interface IPaginationProps {
    currentPage: number;
    total: number;
}

const PAGINATION_PAGE_AMOUNT = 5;
const FIRST_INDEX_PAGE = 1;
const MIDDLE_INDEX_PAGE = Math.floor(PAGINATION_PAGE_AMOUNT / 2);

enum EArrow {
    LEFT,
    RIGHT,
}

export const Pagination = ({currentPage, total}: IPaginationProps) => {
    const dispatch = UseAppDispatch();

    const lastIndexPage = Math.floor(total / PER_PAGE);

    const handlePrevPage = () => {
        dispatch(changePage(currentPage - 1));
    };

    const handleNextPage = () => {
        dispatch(changePage(currentPage + 1));
    };

    const handleDotsPage = () => {
        dispatch(changePage(currentPage < lastIndexPage - MIDDLE_INDEX_PAGE ? currentPage + 1 : currentPage - 1));
    };

    const handlePageItemsClick = (page: number) => {
        dispatch(changePage(page));
    };

    const renderArrowButton = (arrow: EArrow) => {
        const {disable, icon, label, onChange} =
            arrow === EArrow.LEFT
                ? {icon: arrowPrev, label: 'Назад', onChange: handlePrevPage, disable: currentPage === 1}
                : {icon: arrowNext, label: 'Вперед', onChange: handleNextPage, disable: currentPage === lastIndexPage};

        const labelButton = (
            <>
                <img src={icon} alt="arrowIcon" />
                <span>{label}</span>
            </>
        );

        return <Button disable={disable} label={labelButton} onChange={onChange} theme={EButtonTheme.REDIRECT} />;
    };

    const renderPageItems = () => {
        const pageItems = [];

        let startIndexPage;
        let endIndexPage;

        if (currentPage <= MIDDLE_INDEX_PAGE) {
            startIndexPage = FIRST_INDEX_PAGE;
            endIndexPage = PAGINATION_PAGE_AMOUNT;
        } else if (currentPage > lastIndexPage - MIDDLE_INDEX_PAGE) {
            startIndexPage = lastIndexPage - PAGINATION_PAGE_AMOUNT + FIRST_INDEX_PAGE;
            endIndexPage = lastIndexPage;
        } else {
            startIndexPage = currentPage - MIDDLE_INDEX_PAGE;
            endIndexPage = currentPage + MIDDLE_INDEX_PAGE;
        }

        const dotsPage = '...';

        for (let i = startIndexPage; i <= endIndexPage; i++) {
            pageItems.push(i);
        }

        if (lastIndexPage > PAGINATION_PAGE_AMOUNT) {
            if (currentPage < lastIndexPage - MIDDLE_INDEX_PAGE) {
                pageItems.push(dotsPage);
                pageItems.push(lastIndexPage);
            } else {
                pageItems.unshift(dotsPage);
                pageItems.unshift(FIRST_INDEX_PAGE);
            }
        }

        return (
            <div className={styles.paginationItems}>
                {pageItems.map((item, index) => (
                    <Button
                        className={item === currentPage && 'selected'}
                        key={index}
                        label={item}
                        onChange={item === dotsPage ? handleDotsPage : handlePageItemsClick}
                        theme={EButtonTheme.PAGINATION}
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
