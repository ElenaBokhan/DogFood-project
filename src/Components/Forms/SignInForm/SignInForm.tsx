import {yupResolver} from '@hookform/resolvers/yup';
import {Button, EButtonTheme} from 'Components/Common/Button/Button';
import {Input} from 'Components/Common/Input/Input';
import {ETextType, Text} from 'Components/Common/Text/Text';
import {signInFormSchema} from 'Components/Forms/Helpers/validators';
import styles from 'Components/Forms/SignInForm/SignInForm.module.css';
import {SubmitHandler, useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {useSignInMutation} from 'Store/Api/AuthApi';
import {getMessageFromError} from 'Utils/errorUtils';
import {TFormSignInData} from 'Components/Forms/Helpers/types';
import {useLocation, useNavigate} from 'react-router-dom';
import {setUserProfile} from 'Store/Slices/userProfile/UserProfileSlice';
import {UseAppDispatch} from 'Store/hooks';
import {objectHasProperty} from 'Utils/utils';
import {setAccessToken} from 'Store/Slices/Auth/AuthSlice';

export const SignInForm = () => {
    const [signInRequest] = useSignInMutation();
    const navigate = useNavigate();
    const dispatch = UseAppDispatch();
    const {state} = useLocation();

    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting, isValid, isSubmitted},
    } = useForm<TFormSignInData>({
        resolver: yupResolver(signInFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const redirectToSignUp = () => {
        navigate('/signup');
    };

    const redirect = () => {
        navigate(objectHasProperty(state, 'from') && typeof state.from === 'string' ? state.from : '/');
    };

    const renderButtonsControl = () => (
        <div className={styles.buttonsContainer}>
            <Button
                disable={isSubmitting || (isSubmitted && (!isValid || isSubmitting))}
                label={'Войти'}
                type={'submit'}
            />
            <Button
                theme={EButtonTheme.REDIRECT}
                onChange={redirectToSignUp}
                disable={isSubmitting}
                label={'Зарегистрироваться'}
            />
        </div>
    );

    const onSubmit: SubmitHandler<TFormSignInData> = async (value) => {
        try {
            const {data, token} = await signInRequest(value).unwrap();
            dispatch(setAccessToken(token));
            dispatch(setUserProfile(data));
            redirect();
            toast.success('Вы успешно зарегистрированы');
        } catch (e) {
            toast.error(getMessageFromError(e, 'Неизвестная ошибка'));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.modalContainer}>
                <Text type={ETextType.H2} value={'Вход'} />
                <div className={styles.inputsContainer}>
                    <Input errors={errors} label={'email'} register={register} />
                    <Input errors={errors} label={'password'} register={register} />
                </div>
                {renderButtonsControl()}
            </div>
        </form>
    );
};
