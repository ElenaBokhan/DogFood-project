import {yupResolver} from '@hookform/resolvers/yup';
import {Button, EButtonTheme} from 'Components/Common/Button/Button';
import {Input} from 'Components/Common/Input/Input';
import {EFontColor, ETextType, Text} from 'Components/Common/Text/Text';
import {signUpFormSchema} from 'Components/Forms/Helpers/validators';
import styles from 'Components/Forms/SignInForm/SignInForm.module.css';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

import {useSignUpMutation} from 'Store/Api/AuthApi';
import {getMessageFromError} from 'Utils/errorUtils';
import {TFormSignUpData} from 'Components/Forms/Helpers/types';

export const SignUpForm = () => {
    const [signUpRequest] = useSignUpMutation();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting, isValid, isSubmitted},
    } = useForm<TFormSignUpData>({
        resolver: yupResolver(signUpFormSchema),
        defaultValues: {
            email: '',
            password: '',
            group: '',
        },
    });

    const renderTextAgreement = () => {
        const value =
            'Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой конфиденциальности и соглашаетесь на информационную рассылку.';

        return <Text fontColor={EFontColor.GREY} type={ETextType.S1} value={value} />;
    };

    const redirectToSignIn = () => {
        navigate('/signin');
    };

    const renderButtonsControl = () => {
        return (
            <div className={styles.buttonsContainer}>
                <Button
                    disable={isSubmitting || (isSubmitted && (!isValid || isSubmitting))}
                    label={'Зарегистрироваться'}
                    type={'submit'}
                />
                <Button onChange={redirectToSignIn} theme={EButtonTheme.REDIRECT} label={'Войти'} />
            </div>
        );
    };

    const onSubmit: SubmitHandler<TFormSignUpData> = async (data) => {
        // eslint-disable-next-line no-useless-catch
        try {
            await signUpRequest(data).unwrap();
            redirectToSignIn();
            // const response = await getResponse(1e3);
            console.log({data});
            toast.success('Вы успешно зарегистрированы');
        } catch (e) {
            toast.error(getMessageFromError(e, 'Неизвестная ошибка'));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.modalContainer}>
                <Text type={ETextType.H2} value={'Регистрация'} />
                <div className={styles.inputsContainer}>
                    <Input errors={errors} label={'email'} register={register} />
                    <Input errors={errors} label={'password'} register={register} />
                    <Input errors={errors} label={'group'} register={register} />
                </div>
                {renderTextAgreement()}
                {renderButtonsControl()}
            </div>
        </form>
    );
};
