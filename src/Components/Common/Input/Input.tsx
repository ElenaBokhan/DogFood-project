import cn from 'classnames';
import styles from 'Components/Common/Input/Input.module.css';
import {EFontColor, ETextType, Text} from 'Components/Common/Text/Text';
import {TFormSignUpData, TFormUpdateUserData} from 'Components/Forms/Helpers/types';
import {FieldErrors, Path, UseFormRegister} from 'react-hook-form';

interface IInputProps {
    errors: FieldErrors<{
        email?: string;
        password?: string;
        group?: string;
        name?: string;
        about?: string;
    }>;
    label: Path<TFormSignUpData> | Path<TFormUpdateUserData>;
    register: UseFormRegister<TFormSignUpData & TFormUpdateUserData>;
    testId?: string;
}

export const Input = ({errors, register, label, testId}: IInputProps) => {
    const style = errors[label] ? cn(styles.inputError, styles.input) : styles.input;

    return (
        <>
            <input data-testid={testId} className={style} placeholder={label} {...register(label)} />
            {errors[label] && <Text fontColor={EFontColor.RED} type={ETextType.S1} value={errors[label].message} />}
        </>
    );
};
