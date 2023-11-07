import {yupResolver} from '@hookform/resolvers/yup';
import {Button} from 'Components/Common/Button/Button';
import {Input} from 'Components/Common/Input/Input';
import {ETextType, Text} from 'Components/Common/Text/Text';
import {useActions} from 'hooks/hooks';
import {SubmitHandler, useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {useUpdateUserMutation} from 'Store/Api/AuthApi';
import {getMessageFromError} from 'Utils/errorUtils';
import {TFormUpdateUserData} from 'Components/Forms/Helpers/types';
import {updateUserFormSchema} from 'Components/Forms/Helpers/validators';
import styles from 'Components/Forms/UpdateUserForm/UpdateUserForm.module.css';

export const UpdateUserForm = ({onCloseForm}: {onCloseForm: () => void}) => {
    const [updateUser] = useUpdateUserMutation();
    const {setUserProfile} = useActions();

    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting, isValid, isSubmitted},
    } = useForm<TFormUpdateUserData>({
        resolver: yupResolver(updateUserFormSchema),
        defaultValues: {
            name: '',
            about: '',
        },
    });

    const renderButtonsControl = () => (
        <Button
            disable={isSubmitting || (isSubmitted && (!isValid || isSubmitting))}
            label={'Изменить'}
            type={'submit'}
        />
    );

    const onSubmit: SubmitHandler<TFormUpdateUserData> = async (value) => {
        try {
            const data = await updateUser(value).unwrap();
            setUserProfile(data);
            onCloseForm();
        } catch (e) {
            toast.error(getMessageFromError(e, 'Неизвестная ошибка'));
        }
    };

    return (
        <form className={styles.addReviewPage} onSubmit={handleSubmit(onSubmit)}>
            <Text type={ETextType.H2} value={'Изменить данные пользователя'} />
            <div className={styles.inputsContainer}>
                <Input errors={errors} label={'name'} register={register} />
                <Input errors={errors} label={'about'} register={register} />
            </div>
            {renderButtonsControl()}
        </form>
    );
};
