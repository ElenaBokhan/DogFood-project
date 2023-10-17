import styles from 'Pages/SignUp/SignUp.module.css';
import {SignUpForm} from 'Components/Forms/SignUpForm/SignUpForm';

export const SignUp = () => {
    return (
        <div className={styles.signPage}>
            <SignUpForm />
        </div>
    );
};
