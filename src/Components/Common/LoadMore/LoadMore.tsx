import {Text} from 'Components/Common/Text/Text';
import styles from 'Components/Common/LoadMore/LoadMore.module.css';
import {useLayoutEffect, useRef} from 'react';

export const LoadMore = ({action, isEnd}: {action: () => void; isEnd: boolean}) => {
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let observer: IntersectionObserver | undefined = undefined;

        if (!isEnd) {
            const options: IntersectionObserverInit = {
                threshold: 0.5,
            };

            const callback: IntersectionObserverCallback = ([loadMore]) => {
                if (loadMore.isIntersecting) {
                    action();
                }
            };
            observer = new IntersectionObserver(callback, options);

            ref.current && observer.observe(ref.current);
        }

        return () => {
            observer && observer.disconnect();
        };
    }, [action, isEnd]);

    return (
        <div ref={ref} className={styles.loadMore}>
            {isEnd && <Text value={'Конец списка'} />}
        </div>
    );
};
