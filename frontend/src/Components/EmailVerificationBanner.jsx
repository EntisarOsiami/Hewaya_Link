import { Alert } from 'react-bootstrap';

const EmailVerificationBanner = () => {
    return (
        <Alert variant="warning">
            Please verify your email address. Check your inbox for the verification email. If you don’t see the email, please check your spam folder.
          
        </Alert>
    );
}

export default EmailVerificationBanner;
