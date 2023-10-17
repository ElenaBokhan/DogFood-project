import styles from 'Pages/PageNotFound/PageNotFound.module.css';
import {SignInForm} from 'Components/Forms/SignInForm/SignInForm';

export const SignIn = () => {
    return (
        <div className={styles.pageNotFound}>
            <SignInForm />
        </div>
    );
};
