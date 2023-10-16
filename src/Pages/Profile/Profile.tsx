import mailIcon from 'assets/ic-mail.svg';
import phoneIcon from 'assets/ic-phone.svg';
import {Button, EButtonTheme} from 'Components/Common/Button/Button';
import {EFontColor, ETextType, Text} from 'Components/Common/Text/Text';
import {TitlePage} from 'Components/Common/TitlePage/TitlePage';
import styles from 'Pages/Profile/Profile.module.css';
import {UseAppSelector} from 'Store/hooks';
import {selectUser} from 'Store/Slices/userProfile/UserProfileSelectors';

export const Profile = () => {
    const {name, email} = UseAppSelector(selectUser);

    const renderButtonBlock = () => {
        return (
            <div className={styles.buttons}>
                <Button label={'Изменить'} theme={EButtonTheme.REDIRECT} />
                <Button label={'Выйти'} theme={EButtonTheme.REDIRECT} />
            </div>
        );
    };

    const renderBody = () => {
        return (
            <div>
                <Text type={ETextType.H3} value={name} />
                <div>
                    <img alt="phoneIcon" height="16px" src={phoneIcon} />
                    <Text fontColor={EFontColor.GREY} type={ETextType.S1} value={'+7 (977) 980-12-09'} />
                </div>
                <div>
                    <img alt="mailIcon" height="16px" src={mailIcon} />
                    <Text fontColor={EFontColor.GREY} type={ETextType.S1} value={email} />
                </div>
            </div>
        );
    };

    return (
        <div className={styles.profile}>
            <TitlePage label={'Профиль'} />
            {renderBody()}
            {renderButtonBlock()}
        </div>
    );
};
