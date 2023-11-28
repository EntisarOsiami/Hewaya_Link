import { Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const EmailVerificationBanner = () => {
    const { t } = useTranslation();

    return (
        <Alert variant="warning">
            {t('emailVerificationBanner:message')}
        </Alert>
    );
}

export default EmailVerificationBanner;
